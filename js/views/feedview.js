define(["jquery", "underscore", "backbone", "tweetview"], function($, _, Backbone, TweetView) {
    var FeedView = Backbone.View.extend({
        tag: "div",
        className: "feed",
        initialize: function(options) {
            this.collection.bind("add", function(model) {
                var tweetView = new TweetView({
                    model: model
                });
                $(this.el).prepend(tweetView.render().el);
            }, this);
            
            this.render();
        },
        render: function() {
            return this;
        }
    });
    return FeedView;
});
