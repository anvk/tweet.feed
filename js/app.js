require.config({
    paths: {
        jquery: "libs/jquery/jquery-min",
        underscore: "libs/underscore/underscore-min",
        backbone: "libs/backbone/backbone-optamd3-min",
        text: "libs/require/text",
        config: "models/config",
        tweetmodel: "models/tweet",
        tweetview: "views/tweetview",
        feed: "collections/feed",
        feedview: "views/feedview",
        toppanelview: "views/toppanelview",
        appview: "views/appview",
        startfeedbuttonview: "views/startfeedbuttonview"
    }
});
require(["appview"], function(AppView) {
    window.tweetFeedApp = window.tweetFeedApp || {
        views: {
            appView: new AppView
        }
    };
});