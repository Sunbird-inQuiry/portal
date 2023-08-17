module.exports = {
    "API": {
        "CHANNEL": "/action/channel/v2/*",
        "FRAMEWORK": "/api/framework/v2/read/*",
        "COMPOSITE": "/action/composite/v3/search",
        "COMPOSITE_API": "/api/composite/v1/search",
        "QUESTION_LIST": "/api/question/v2/list",
        "USERS": "/action/users",
        "TELEMMETRY": "/action/data/v3/telemetry",
        "OBJECT_CATEGORY_DEFINITION": "/action/object/category/definition/v2/*",
        "PREFIX": {
            "ACTION": "/action",
            "ASSETS": "/assets",
            "API": "/api"
        },
        "LEARNER": {
            "FRAMEWORK": "/learner/framework/v1/read/*",
            "QUESTIONSET_HIERARCHY": "/learner/questionset/v2/hierarchy/*"
        },
        "LATEX": {
            "CONVERT": "/latex/convert"
        },
        "QUESTIONSET": {
            "CREATE": "/action/questionset/v2/create",
            "READ": "/action/questionset/v2/read/*",
            "HIERARCHY_READ": "/action/questionset/v2/hierarchy/*",
            "REVIEW": "/action/questionset/v2/review/*",
            "REJECT": "/action/questionset/v2/reject/*",
            "PUBLISH": "/action/questionset/v2/publish/*",
            "RETIRE": "/action/questionset/v2/retire/*"
        },
        "ASSET": {
            "CREATE": "/action/asset/v2/create",
            "CONTENT_UPLOAD_URL": "/action/content/v3/upload/url/*",
            "ASSET_UPLOAD": "/action/asset/v2/upload/*"
        }
    }
}
