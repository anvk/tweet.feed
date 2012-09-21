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
        searchpanelview: "views/searchpanelview"
    }
});
require(["feed", "feedview", "searchpanelview"], function(Feed, FeedView, SearchPanelView) {
        window.tweetFeedApp = window.tweetFeedApp || {
            collections: {
                tweetFeed: new Feed([])
            },
            views: {
                feedView: null
            }
        };
        
        window.tweetFeedApp.views.feedView = new FeedView({
            collection: window.tweetFeedApp.collections.tweetFeed
        });
    });
});