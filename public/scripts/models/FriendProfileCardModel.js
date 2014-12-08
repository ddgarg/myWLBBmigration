define(["jquery","backbone"], function($, Backbone){

	return Friend = Backbone.Model.extend({

        urlRoot: "/user/friend/details/",
	     idAttribute: "_id",

        setUserId: function(Id){
            this.userId = Id;
        },

        url: function(){
            return this.urlRoot + this.userId;
        }
   });
});