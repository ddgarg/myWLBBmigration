define(['jquery', 'backbone','templates/upcomingBirthdays'], function($, Backbone){

    return Backbone.View.extend({

        tagName     : 'li',

        initialize: function(){
            this.render();
        },
        render: function(){
            var self = this;
            dust.render('upcomingBirthdays', this.model.toJSON(), function(err, out){
                self.$el.html(out);
            });
        }
    });
});

