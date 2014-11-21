define(["jquery","underscore","backbone"], function($, _, Backbone){
    var Wish = Backbone.Model.extend({

        urlRoot: "/wishlist",

        idAttribute: "asin",

        initialize: function () {

        },

        defaults: {
            asin        : null,
            item_image  : "",
            item_link   : "",
            item_title  : "",
            price       : ""
        }
    });

    return Wish;

});