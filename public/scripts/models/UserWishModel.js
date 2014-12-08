define(["jquery", "backbone"], function($, Backbone){
    return Backbone.Model.extend({

        urlRoot: "/wish",
        idAttribute: "_id",

        defaults: {
            asin        : null,
            item_image  : "",
            item_link   : "",
            item_title  : "",
            pricing     : {"retail":""},
            isNew       : false
        }
    });
});