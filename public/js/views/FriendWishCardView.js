define(['jquery','backbone','../../templates/US/en/friendWishCard'], function($, Backbone){

    return Backbone.View.extend({

        tagName     : 'li',
        className   : 'col-md-3',
	    
        initialize: function(){
            this.render();
        },
        render: function(){
            var self = this;
            dust.render('friendWishCard', this.model.toJSON(), function(err, out){
                self.$el.html(out);
            });
        }
    });
});

