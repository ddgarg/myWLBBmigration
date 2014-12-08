define(['jquery','backbone', '../../templates/US/en/friendOverviewCard'], function($,Backbone){

    return Backbone.View.extend({

        className   : 'col-md-4 userdetails',
        initialize: function(){
            this.render();
        },
        render: function(){
	        var self = this;
            dust.render('friendOverviewCard', this.model.toJSON(), function(err, out){
                self.$el.html(out);
            });
        }
    });
});

