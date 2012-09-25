define(["jquery", "underscore", "backbone", "feed", "feedview", "toppanelview", "startfeedbuttonview", "config"], function($, _, Backbone, Feed, FeedView, TopPanelView, StartFeedViewButton, Config) {
    var AppView = Backbone.View.extend({
        el: ".feedbody",
        initialize: function(options) {
            this.tweetFeed = new Feed();
            this.startFeedButtonView = new StartFeedViewButton({
                model: Config
            });
            this.feedView = new FeedView({
                model: Config,
                collection: this.tweetFeed
            });
        }
    });
    return AppView;
});
