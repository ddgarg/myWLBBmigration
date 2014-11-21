define(["jquery","underscore","backbone","dustcore"], function($, _, Backbone){

    var UserView = Backbone.View.extend({

        className   : "userdetails",

//        events: {
//
//            "click button.deleteProduct" : "showDeleteProductConfirmation"
//        },
//
//        showDeleteProductConfirmation: function(e) {
//
//            e.preventDefault();
//            $("#deleteConfirmationModal").modal();
//
//        },


        initialize: function(){
            this.model.on('change', this.render, this);
        },
        render: function(){
            var self = this;
            dust.render("userdetailshome", this.model.toJSON(), function(err, out){
                self.$el.html(out);
            });
        }
    });

    return UserView;

});

