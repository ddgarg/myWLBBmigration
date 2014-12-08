define(["jquery", "backbone", "models/FriendProfileCardModel"], function($, Backbone, FriendProfileCardModel){

    return Backbone.Collection.extend({

        model: FriendProfileCardModel,
        url: "/user/friends",

        parse: function(response){
            return response.data;
        }
    });
});