define(["jquery","underscore","backbone","dustcore", "templates/wishtemplate"], function($, _, Backbone){

    var WishView = Backbone.View.extend({

        tagName     : "li",
        className   : "col-md-3 main-wishlist-li",

        events: {

            "click button.deleteProduct" : "showDeleteProductConfirmation"
        },

        showDeleteProductConfirmation: function(e) {

            e.preventDefault();
            $("#deleteConfirmationModal").modal();

        },


        initialize: function(){
            this.render();
            this.model.on('destroy', this.remove, this);
        },
        render: function(){
            var self = this;
            dust.render("wishtemplate", this.model.toJSON(), function(err, out){
                self.$el.html(out);
                self.$el.attr('id', self.model.asin);
            });
        }
    });

    return WishView;

});

