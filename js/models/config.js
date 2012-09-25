define(["underscore", "backbone"], function(_, Backbone) {
    var Config = Backbone.Model.extend({
        defaults: {
            debug: false,
            runCycles: 15,
            tweetUpdateTime: 1000,
            query: "batman",
            running: false
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
