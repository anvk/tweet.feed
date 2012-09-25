define(["underscore", "backbone"], function(_, Backbone) {
    var Config = Backbone.Model.extend({
        defaults: {
            debug: false,
            runCycles: 15,
            tweetUpdateTime: 1000,
            query: "batman",
            fullQuery: "",
            running: false
        },
        initialize: function() {
            this.getFullQuery();
            this.bind("change:query", this.getFullQuery, this);
        },
        getFullQuery: function() {
            var queryEncoded = encodeURIComponent(this.get("query"));
            this.set({
                fullQuery: this.makeFullQuery(queryEncoded)
            });
        },
        makeFullQuery: function(searchCriteriaEncoded) {
            return "http://search.twitter.com/search.json?q=" + searchCriteriaEncoded + "&callback=?";
        },
        canRun: function () {
            if (!this.get("running")) {
                return false;
            } else {
                if (this.get("debug")) {
                    var runCycles = this.get("runCycles");
                    if (runCycles > 0) {
                        this.set({
                            runCycles: runCycles - 1
                        });
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return true;
        }
    });
    return new Config;
});
