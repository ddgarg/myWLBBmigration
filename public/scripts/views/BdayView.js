define(["jquery","underscore","backbone","dustcore"], function($, _, Backbone){

    var BdayView = Backbone.View.extend({

        tagName     : "li",

//        events: {
//
//            "click button.deleteProduct" : "showDeleteProductConfirmation"
//        },

//        showDeleteProductConfirmation: function(e) {
//
//            e.preventDefault();
//            $("#deleteConfirmationModal").modal();
//
//        },


        initialize: function(){
            this.render();
        },
        render: function(){
            var self = this;
            dust.render("upcomingbirthday", this.model.toJSON(), function(err, out){
                self.$el.html(out);
            });
        }
    });

    return BdayView;

});

