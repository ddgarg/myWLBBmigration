define(['jquery', 'backbone', '../../templates/US/en/userAddress'], function($, Backbone){

    return Backbone.View.extend({

        initialize      : function(){
            this.model.on('change', this.render, this);
            Backbone.pubSub.on('addressDeleted',  this.addressDeleted, this);
        },

        addressDeleted  : function(){
            this.model.clear();
            this.render();
        },

        render: function(){
            var self = this;
            dust.render('userAddress', this.model.toJSON(), function(err, out){
                self.$el.html(out);
            });
        }
    });
});

