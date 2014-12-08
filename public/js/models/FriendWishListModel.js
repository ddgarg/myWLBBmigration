define(["jquery","backbone","models/FriendWishCardModel"], function($, Backbone, FriendWishCardModel){

    return Backbone.Collection.extend({

        model: FriendWishCardModel,

        setUserId: function(Id){
            this.userId = Id;
        },

        url: function(){
            return '/user/wishlist/' + this.userId;
        }
    });
});