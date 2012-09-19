define(["underscore", "backbone", "tweetmodel"], function(_, Backbone, Tweet) {
    var Tweets = Backbone.Collection.extend({
        model: Tweet,
        initialize: function(models, options) {
            this.query = options.query;
        },
        url: function() {
            return "http://search.twitter.com/search.json?q=" + this.query + "&callback=?";
        },
        parse: function(data) {
            return data.results;
        },
        add: function(models, options) {
            var newModels = [];
            _.each(models, function(model) {
                if (typeof this.get(model.id) === "undefined") {
                    newModels.push(model);
                }
            }, this);
            return Backbone.Collection.prototype.add.call(this, newModels, options);
        }
    });
    return Tweets;
});
