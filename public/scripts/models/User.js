define(["jquery","underscore","backbone"], function($, _, Backbone){
    var User = Backbone.Model.extend({

        urlRoot: "/user/details",

        idAttribute: "_id",

        initialize: function () {

        }

    });

    return User;

});