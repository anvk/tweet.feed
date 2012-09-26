define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    var StartFeedViewButton = Backbone.View.extend({
        el: ".topPanel-buttonPanel",
        styleStop: "stop",
        styleStart: "start",
        initialize: function() {
            _.bindAll(this, "startStopFeed", "setButtonStyle");
            this.setButtonStyle();
            this.model.bind("change:running", this.setButtonStyle, this);
        },
        events: {
            "click": "startStopFeed"
        },
        setButtonStyle: function() {
            var $el = $(this.el);
            var styleStop = this.styleStop;
            var styleStart = this.styleStart;
            $el.removeClass(styleStop + " " + styleStart);
            $el.addClass(this.model.get("running") ? styleStart : styleStop);
        },
        startStopFeed: function() {
            this.model.startStop();
        }
    });
    return StartFeedViewButton;
});
