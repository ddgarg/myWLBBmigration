define(["jquery","underscore","backbone","models/Bday"], function($, _, Backbone,Bday){

    var BdayList = Backbone.Collection.extend({

        model: Bday,

        url: "user/friends/birthday"

//        parse: function(response){
//            this.userDetails = response.userDetails;
//            this.upcomingbdays = response.upcomingbdays;
//
//            return response.wishes;
//        }

    });

    return BdayList;

});