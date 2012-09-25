define(["jquery", "underscore", "backbone", "config"], function($, _, Backbone, Config) {
    var StartFeedViewButton = Backbone.View.extend({
        el: ".topPanel-buttonPanel",
        styleStop: "stop",
        styleStart: "start",
        initialize: function() {
            this.setButtonStyle();
            this.model.bind("change:running", this.setButtonStyle, this);
        },
        events: {
            "click": "startStopFeed"
        },
        setButtonStyle: function() {
            var $el = $(this.el);
            $el.removeClass(this.styleStop + " " + this.styleStart);
            $el.addClass(Config.get("running") ? this.styleStart : this.styleStop);
        },
        startStopFeed: function() {
            var running = !Config.get("running");
            Config.set({
                running: running
            });
        }
    });
    return StartFeedViewButton;
});
