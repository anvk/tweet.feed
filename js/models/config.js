define(["underscore", "backbone"], function(_, Backbone) {
    var Config = Backbone.Model.extend({
        defaults: {
            debug: true,
            runCycles: 5,
            tweetUpdateTime: 1000,
            query: "batman"
        },
        canRun: function () {
            if (!this.get("debug")) {
                return true;
            }
            var runCycles = this.get("runCycles");
            if (runCycles > 0) {
                this.set({
                    runCycles: runCycles - 1
                });
                return true;
            }
            return false;
        }
    });
    return new Config;
});
