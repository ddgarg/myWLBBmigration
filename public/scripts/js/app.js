define(["backbone","routers/AppRouter"], function(Backbone, AppRouter){

    return App = Backbone.View.extend({

        el: $('body'),

        createCommonComponents: function(){
            userAddressModel.fetch({"success": function(){
                $("#addressdiv").html(userAddressInModalView.el);
            }});

        },
        start: function () {
            this.createCommonComponents();
            new AppRouter();
            Backbone.history.start();
        }
    });

});