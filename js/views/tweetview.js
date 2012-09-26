define(["jquery", "underscore", "backbone", "text!templates/tweet.html"], function($, _, Backbone, tweetTemplate) {
    var TweetView = Backbone.View.extend({
        tag: "div",
        className: "tweet floatingpanel",
        template: _.template(tweetTemplate),
        render: function() {
            $(this.el).html(this.template({
                tweetuserimage: this.model.get("profile_image_url"),
                tweetuser: this.model.get("from_user"),
                tweettext: this.model.get("text")
            })).hide();
            $(this.el).fadeIn("slow");
            return this;
        }
    });
    return TweetView;
});
