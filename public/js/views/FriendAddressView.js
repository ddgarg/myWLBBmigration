define(['jquery','backbone', '../../templates/US/en/friendAddress'], function($, Backbone){

    return Backbone.View.extend({

        initialize: function(){
            this.model.on('change', this.render, this);
        },
        render: function(){
            var self = this;
            dust.render('friendAddress', this.model.toJSON(), function(err, out){
                self.$el.html(out);
            });
        }
    });
});

