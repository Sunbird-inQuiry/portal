'use strict'
const env = process.env;
const users = require('./users');
let envVariables = {
  BASE_URL: 'dev.inquiry.sunbird.org' || env.inquiry_portal_base_url,
  CONTENT_PROXY_URL: 'https://sunbirdstagingpublic.blob.core.windows.net/sunbird-content-staging',
  API_AUTH_TOKEN: env.inquiry_portal_api_auth_token || "",
  USER_API_TOKEN: env.inquiry_portal_user_api_token || "",
  PORTAL_COOKIES: "",
  CHANNEL_ID: env.inquiry_portal_channel_id || "01309282781705830427",
  USER_ID: env.inquiry_portal_user_id || "",
  CREATORS: users.CREATORS || env.inquiry_portal_creators,
  REVIEWERS: users.REVIEWERS || env.inquiry_portal_reviewers

}
module.exports = envVariables;
