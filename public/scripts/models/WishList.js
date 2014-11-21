define(["jquery","underscore","backbone","models/Wish"], function($, _, Backbone,Wish){

    var WishList = Backbone.Collection.extend({

        model: Wish,

        url: "/mywishlist/mywl"

//        parse: function(response){
//            this.userDetails = response.userDetails;
//            this.upcomingbdays = response.upcomingbdays;
//
//            return response.wishes;
//        }

    });

    return WishList;

});