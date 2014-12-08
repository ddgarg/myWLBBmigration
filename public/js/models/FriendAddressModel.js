define(["jquery","backbone"], function($, Backbone){

	return Backbone.Model.extend({

        urlRoot: "/user/friend/address/",
        idAttribute: "_id",
        
        setUserId: function(Id){
            this.userId = Id;
        },

        url: function(){
            return this.urlRoot + this.userId;
        },

        parse: function(response){
            response.addressstatus = response.addressstatus ? 'absent':'present';
            return response;
        }
    });
});