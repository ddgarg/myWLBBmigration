define(["jquery","backbone","models/BdayModel"], function($,Backbone,BdayModel){

    return Backbone.Collection.extend({
        model: BdayModel,
        url: "user/friends/birthday"
    });
});