define(["jquery", "underscore", "backbone", "tweetview", "config"], function($, _, Backbone, TweetView, Config) {
    var FeedView = Backbone.View.extend({
        el: ".feedbody",
        loop: null,
        initialize: function(options) {
            _.bindAll(this, "updateTweets");

            this.collection.bind("add", function(model) {
                var tweetView = new TweetView({
                    model: model
                });
                $(this.el).prepend(tweetView.render().el);
            }, this);

            this.render();
            this.updateTweets();
        },
        render: function() {
            return this;
        },
        updateTweets: function() {
            this.collection.fetch({
                add: true
            });
            if (!Config.canRun()) {
                clearTimeout(this.loop);
                return;
            }
            this.loop = setTimeout(this.updateTweets, Config.get("tweetUpdateTime"));
        }
    });
    return FeedView;
});
