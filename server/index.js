const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const urlHelper = require('url');
const proxyUtils = require('./proxyUtils.js');
const responseUtils = require("./responseUtil.js");
const uuid = require('uuid/v1');
const routes = require('./config/constants');
const latexService = require('./latexService.js');

const envVariables = require('./config/environment');
const BASE_URL = envVariables.BASE_URL;

var app = express();
app.set('port', 3000);
app.use(express.json())
app.use(express.static(process.cwd()+"/dist/"));

app.get(routes.API.LATEX.CONVERT, latexService.convert);
app.post(routes.API.LATEX.CONVERT, bodyParser.json({ limit: '1mb' }), latexService.convert);

app.post(routes.API.USERS, function (req, res) {
  let response = {
    apiId: "api.v1.users",
    apiVersion: "1.0",
    msgid: uuid(),
    result: {
      users: []
    }
  };
  var roleType = req.body.roleType && req.body.roleType.toLowerCase();
  if (roleType == 'creator') {
    response.result.users = envVariables.CREATORS.filter(function (user) {
      return user;
    });
    let creatorResonse = responseUtils.successResponse(response)
    res.send(creatorResonse);
  } else if (roleType == 'reviewer') {
    response.result.users = envVariables.REVIEWERS.filter(function (user) {
      return user;
    });
    let reviewerResonse = responseUtils.successResponse(response)
    res.send(reviewerResonse);
  } else {
    response.errCode = 400;
    response.errmsg = "Request should have the roleType";
    let errorResponse = responseUtils.errorResponse(response)
    res.status(400).send(response);
  }
});

app.use([
  routes.API.COMPOSITE,
  routes.API.CHANNEL,
  routes.API.FRAMEWORK,
  routes.API.QUESTIONSET_READ,
  routes.API.QUESTION_LIST,
  routes.API.TELEMMETRY
], proxy(BASE_URL, {
  https: true,
  proxyReqPathResolver: function (req) {
    let originalUrl = req.originalUrl.replace("/action/", "/api/");
    originalUrl = originalUrl.replace("/v3/", "/v1/");
    return urlHelper.parse(originalUrl).path;
  },
  proxyReqOptDecorator: proxyUtils.decoratePublicRequestHeaders()
}));

app.all([
  routes.API.LEARNER.FRAMEWORK,
  routes.API.LEARNER.QUESTIONSET_HIERARCHY,
], proxy(BASE_URL, {
  https: true,
  proxyReqPathResolver: function (req) {
    console.log('proxyReqPathResolver ', urlHelper.parse(req.url).path);
    return urlHelper.parse(req.url).path;
  },
  proxyReqOptDecorator: proxyUtils.decoratePublicRequestHeaders()
}));

app.use([routes.API.PREFIX.ACTION], proxy(BASE_URL, {
  https: true,
  proxyReqPathResolver: function (req) {
    let originalUrl = req.originalUrl.replace("/action/", "/api/");
    return urlHelper.parse(originalUrl).path;
  },
  proxyReqOptDecorator: proxyUtils.decoratePublicRequestHeaders()
}));

app.use([routes.API.PREFIX.API], proxy(BASE_URL, {
  https: true,
  proxyReqPathResolver: function (req) {
    console.log('originalUrl', req.originalUrl)
    return urlHelper.parse(req.originalUrl).path;
  },
  proxyReqOptDecorator: proxyUtils.decoratePublicRequestHeaders()
}));

app.get('/*', (req,res) => {
    res.sendFile(process.cwd()+"/dist/index.html")
});

http.createServer(app).listen(app.get('port'), 3000);
