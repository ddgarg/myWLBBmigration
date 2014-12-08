define(["jquery","backbone"], function($, Backbone){
    return Backbone.Model.extend({

        urlRoot: "/user/details",
        idAttribute: "_id"

    });
});