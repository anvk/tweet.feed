define(["jquery", "underscore", "backbone", "config", "text!templates/toppanel.html"], function($, _, Backbone, Config, topPanelTemplate) {
    var TopPanelView = Backbone.View.extend({
        el: ".topPanel",
        template: _.template(topPanelTemplate),
        initialize: function() {
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
            Config.set({
                running: false,
                query: this.searchInput.val()
            });
            //alert('hola');
        }
    });
    return new TopPanelView;
});
