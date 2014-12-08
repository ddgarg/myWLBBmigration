define(['jquery','backbone', 'templates/friendProfileCard'], function($,Backbone){

    return Backbone.View.extend({

        className   : 'userdetails',
        initialize: function(){
            this.model.on('change', this.render, this);
        },
        render: function(){
            var self = this;
            dust.render('friendProfileCard', this.model.toJSON(), function(err, out){
                self.$el.html(out);
            });
        }
    });
});

