define(["jquery","backbone"], function($, Backbone){

	return Backbone.Model.extend({

        urlRoot: "/user/address",
        idAttribute: "_id",

        parse: function(response){
            response.addressstatus = response.addressstatus ? 'absent':'present';
            return response;
        },

        saveaddress: function (data) {
            var addr = {};
            data.forEach(function (addrParam) {
                addr[addrParam.name] = addrParam.value;
            });
            this.set(addr);
            this.save();
        },

        remove: function () {
            this.destroy();
        },

        setAddressStatus: function () {
            if (this.get('address1'))
            {
                this.set({"addressstatus": "present"});
            }
            else
            {
                this.set({"addressstatus": "absent"});
            }
        }
    });
});