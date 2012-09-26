define(["jquery", "underscore", "backbone", "config", "text!templates/toppanel.html"], function($, _, Backbone, Config, topPanelTemplate) {
    var TopPanelView = Backbone.View.extend({
        el: ".topPanel",
        template: _.template(topPanelTemplate),
        initialize: function() {
            _.bindAll(this, "changeSearch");
            this.render();
            this.searchInput = $(".searchPanel-searchinput");
        },
        render: function() {
            $(this.el).html(this.template);
        },
        events: {
            "keyup .searchPanel-searchinput": "changeSearch"
        },
        changeSearch: function() {
            Config.changeSearch(this.searchInput.val());
        }
    });
    return new TopPanelView;
});
