define(["jquery", "underscore", "backbone", "feed", "feedview", "toppanelview", "startfeedbuttonview", "config"], function($, _, Backbone, Feed, FeedView, TopPanelView, StartFeedViewButton, Config) {
    var AppView = Backbone.View.extend({
        el: ".feedbody",
        initialize: function(options) {
            this.tweetFeed = new Feed();
            this.startFeedButtonView = new StartFeedViewButton();
            this.feedView = new FeedView({
                collection: this.tweetFeed
            });
        }
    });
    return AppView;
});
