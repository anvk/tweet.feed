define(["jquery", "underscore", "backbone", "config", "text!templates/toppanel.html"], function($, _, Backbone, Config, topPanelTemplate) {
    var TopPanelView = Backbone.View.extend({
        el: ".topPanel",
        template: _.template(topPanelTemplate),
        initialize: function() {
            _.bindAll(this, "changeSearch", "showSpinner");
            this.render();
            this.searchInput = $(".searchPanel-searchinput");
            this.spinner = $(".topPanel-spinner");
            this.showSpinner();
            Config.bind("change:running", this.showSpinner, this);
        },
        render: function() {
            $(this.el).html(this.template);
        },
        events: {
            "keyup .searchPanel-searchinput": "changeSearch"
        },
        changeSearch: function() {
            Config.set({
                query: this.searchInput.val()
            });
        },
        showSpinner: function() {
            var visibility = "hidden";
            if (Config.get("running")) {
                visibility = "visible";
            }
            this.spinner.css("visibility", visibility);
        }
    });
    return new TopPanelView;
});
