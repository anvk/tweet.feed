define(["jquery", "underscore", "backbone", "config"], function($, _, Backbone, Config) {
    var StartFeedViewButton = Backbone.View.extend({
        el: ".topPanel-buttonPanel",
        styleStop: "stop",
        styleStart: "start",
        initialize: function() {
            _.bindAll(this, "startStopFeed", "setButtonStyle");
            this.setButtonStyle();
            Config.bind("change:running", this.setButtonStyle, this);
        },
        events: {
            "click": "startStopFeed"
        },
        setButtonStyle: function() {
            var $el = $(this.el);
            var styleStop = this.styleStop;
            var styleStart = this.styleStart;
            $el.removeClass(styleStop + " " + styleStart);
            $el.addClass(Config.get("running") ? styleStart : styleStop);
        },
        startStopFeed: function() {
            Config.startStop();
        }
    });
    return StartFeedViewButton;
});
