define(['jquery', 'backbone','../../templates/US/en/userWishCard'], function($, Backbone){

    return Backbone.View.extend({

        tagName     : 'li',
        className   : 'col-md-3 main-wishlist-li',

        events: {
            'click button.deleteProduct' : 'showDeleteProductConfirmation'
        },

        showDeleteProductConfirmation: function(event) {
            var self = this;
            event.preventDefault();
            $('#deleteConfirmationModal').modal();
            $('#confirmWishDelete').click(function(){
                self.$el.fadeOut(1500, function(){
                        self.model.destroy();
                    }
                );
            });
        },
        initialize: function(){
            this.render();
            this.model.on('change', this.render,this);
            this.model.on('remove', this.remove,this);
        },
        render: function(){
            var self = this;
            dust.render('userWishCard', this.model.toJSON(), function(err, out){
                self.$el.html(out);
            });
        }
    });
});

