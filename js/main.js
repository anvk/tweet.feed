require.config({
    paths: {
        jquery: "libs/jquery/jquery-min",
        underscore: "libs/underscore/underscore-min",
        backbone: "libs/backbone/backbone-optamd3-min",
        text: "libs/require/text",
        tweetmodel: "models/tweet",
        tweetview: "views/tweetview",
        feed: "collections/feed",
        feedview: "views/feedview",
        searchpanelview: "views/searchpanelview"
    }
});
require(["feed", "feedview", "searchpanelview"], function(Feed, FeedView, SearchPanelView) {
    var debug = true;
    var a = 0;
    var tweetUpdateTime = 1000;
    var query = "batman";
    
    var tweetFeed = new Feed([], {
        query: query
    });
    var FeedView = new FeedView({
        collection: tweetFeed
    });
    
    $(".feedbody").html(FeedView.render().el);
    
    var updateTweets = function() {
        tweetFeed.fetch({
            add: true
        });
        if (a < 5 && debug) {
            return;
        }
            
        setTimeout(updateTweets, tweetUpdateTime);
        a++;
    };
    updateTweets();
});