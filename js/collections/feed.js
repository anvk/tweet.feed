define(["underscore", "backbone", "tweetmodel", "config"], function(_, Backbone, Tweet, Config) {
    var Tweets = Backbone.Collection.extend({
        model: Tweet,
        initialize: function(models) {
        },
        url: function() {
            var query = encodeURIComponent(Config.get("query"));    // this should be changed on set in Config
            return "http://search.twitter.com/search.json?q=" + query + "&callback=?";
        },
        parse: function(data) {
            return data.results;
        },
        add: function(models, options) {
            var newModels = [];
            var query = decodeURIComponent(Config.get("query")); // this should be changed on set in Config
            _.each(models, function(model) {
                if (typeof this.get(model.id) === "undefined") {
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
        }
    });
    return Tweets;
});
