define(["jquery", "underscore", "backbone", "config"], function($, _, Backbone, Config) {
    var StartFeedViewButton = Backbone.View.extend({
        el: ".topPanel-buttonPanel",
        styleStop: "stop",
        styleStart: "start",
        initialize: function() {
            _.bindAll(this, "startStopFeed", "setButtonStyle", "showButton");
            this.setButtonStyle();
            this.showButton();
            Config.bind("change:running", this.setButtonStyle, this);
            Config.bind("change:query", this.showButton, this);
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
        showButton: function() {
            var $el = $(this.el);
            var visibility = "visible";
            if (Config.get("query").length === 0) {
                visibility = "hidden";
            }
            $el.css("visibility", visibility);
        },
        startStopFeed: function() {
            Config.startStop();
        }
    });
    return StartFeedViewButton;
});
