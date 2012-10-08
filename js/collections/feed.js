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
                    var modelText = model.text;
                    if (modelText.toLowerCase().indexOf(query.toLowerCase()) === -1) {
                        return;
                    }
                    modelText = this.highlight(modelText, query);
                    modelText = this.makelinks(modelText);
                    modelText = this.makeTwitterLinks(modelText);
                    model.text = modelText;
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
        // taken from http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
        makelinks: function(text) {
            var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            return text.replace(exp,"<a href='$1'>$1</a>");
        },
        // taken from http://stackoverflow.com/questions/8020739/regex-how-to-replace-twitter-links
        makeTwitterLinks: function(text) {
            return text.replace(/[\@\#]([a-zA-z0-9_]*)/g, function(m,m1) {
                var t = '<a href="http://twitter.com/';
                if(m.charAt(0) == '#') {
                    t += 'hashtag/';
                }
                return t + encodeURI(m1) + '" target="_blank">' + m + '</a>';
            });
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
