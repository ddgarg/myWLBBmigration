define(["jquery","backbone"], function($, Backbone){

	return Backbone.Model.extend({

        idAttribute: "_id",
        urlRoot:"/wish",

        defaults: {
            asin        : null,
            item_image  : "",
            item_link   : "",
            item_title  : "",
            price       : "",
            isNew       : false,
            itemAdded   : false
        }
    });
});