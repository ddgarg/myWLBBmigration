define(["jquery", "backbone","models/UserWishModel"], function($, Backbone, UserWishModel){

    return Backbone.Collection.extend({

        model: UserWishModel,
        url: "/user/wishlist",

        removeWish: function(data){
            var wishToBeDeleted =  this.findWhere({'asin': data.asin});
            wishToBeDeleted.destroy();
        }

    });
});