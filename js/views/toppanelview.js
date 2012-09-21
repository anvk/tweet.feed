define(["jquery", "underscore", "backbone", "config", "text!templates/toppanel.html"], function($, _, Backbone, Config, topPanelTemplate) {
    var TopPanelView = Backbone.View.extend({
        el: ".topPanel",
        template: _.template(topPanelTemplate),
        initialize: function() {
            this.render();
        },
        render: function() {
            $(this.el).html(this.template);
        },
        events: {
            "change .searchPanel-searchinput": "changeSearch"
        },
        changeSearch: function() {
            alert('hola');
        }
    });
    return new TopPanelView;
});
