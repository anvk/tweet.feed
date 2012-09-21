define(["jquery", "underscore", "backbone", "feed", "feedview", "toppanelview"], function($, _, Backbone, Feed, FeedView, TopPanelView) {
    var AppView = Backbone.View.extend({
        el: ".feedbody",
        initialize: function(options) {
            this.tweetFeed = new Feed();
            this.feedView = new FeedView({
                collection: this.tweetFeed
            });
        }
    });
    return AppView;
});
