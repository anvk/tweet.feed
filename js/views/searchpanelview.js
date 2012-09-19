define(["jquery", "underscore", "backbone", "text!templates/searchpanel.html"], function($, _, Backbone, searchPanelTemplate) {
    var SearchPanelView = Backbone.View.extend({
        el: ".search_panel",
        template: _.template(searchPanelTemplate),
        initialize: function() {
            this.render();
        },
        render: function() {
            $(this.el).html(this.template);
        }
    });
    return new SearchPanelView;
});
