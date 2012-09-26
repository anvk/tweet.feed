define(["jquery", "underscore", "backbone", "tweetview"], function($, _, Backbone, TweetView) {
    var FeedView = Backbone.View.extend({
        el: ".feedbody",
        initialize: function() {
            this.collection.bind("add", function(model) {
                var tweetView = new TweetView({
                    model: model
                });
                $(this.el).prepend(tweetView.render().el);
            }, this);
            this.render();
            this.collection.updateTweets();
        },
        render: function() {
            return this;
        }
    });
    return FeedView;
});
