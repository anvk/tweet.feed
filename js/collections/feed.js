define(["underscore", "backbone", "tweetmodel", "config"], function(_, Backbone, Tweet, Config) {
    var Tweets = Backbone.Collection.extend({
        model: Tweet,
        loop: null,
        initialize: function(models) {
            _.bindAll(this, "highlight", "updateTweets", "startStopFeed");
            Config.bind("change:running", this.startStopFeed, this);
        },
        url: function() {
            return Config.get("fullQuery")
        },
        parse: function(data) {
            return data.results;
        },
        add: function(models, options) {
            var newModels = [];
            var query = Config.get("query");
            _.each(models, function(model) {
                if (typeof this.get(model.id) === "undefined") {
                    if (model.text.toLowerCase().indexOf(query.toLowerCase()) === -1) {
                        return;
                    }
                    model.text = this.highlight(model.text, query);
                    newModels.push(model);
                }
            }, this);
            return Backbone.Collection.prototype.add.call(this, newModels, options);
        },
        preg_quote: function ( str ) {
            // http://kevin.vanzonneveld.net
            // +   original by: booeyOH
            // +   improved by: Ates Goral (http://magnetiq.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Onno Marsman
            // *     example 1: preg_quote("$40");
            // *     returns 1: '\$40'
            // *     example 2: preg_quote("*RRRING* Hello?");
            // *     returns 2: '\*RRRING\* Hello\?'
            // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
            // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
            return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
        },
        highlight: function( data, search ) {
            return data.replace( new RegExp( "(" + this.preg_quote( search ) + ")" , 'gi' ), "<span class=\"highlight\">$1</span>" );
        },
        updateTweets: function() {
            if (!Config.isRunning()) {
                clearTimeout(this.loop);
                return;
            }
            this.fetch({
                add: true
            });
            this.loop = setTimeout(this.updateTweets, Config.get("tweetUpdateTime"));
        },
        startStopFeed: function() {
            if (Config.get("running")) {
                this.updateTweets();
            } else {
                clearTimeout(this.loop);
            }
        }
    });
    return Tweets;
});
