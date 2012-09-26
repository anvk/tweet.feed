define(["underscore", "backbone"], function(_, Backbone) {
    var Config = Backbone.Model.extend({
        defaults: {
            debug: false,
            runCycles: 15,
            tweetUpdateTime: 2000,
            query: "cat",
            fullQuery: "",
            running: false
        },
        initialize: function() {
            _.bindAll(this, "getFullQuery", "makeFullQuery", "canRun", "changeSearch", "startStop");
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
        },
        changeSearch: function (newQuery) {
            this.set({
                running: false,
                query: newQuery
            });
        },
        startStop: function() {
            var running = !this.get("running");
            this.set({
                running: running
            });
        }
    });
    return new Config;
});
