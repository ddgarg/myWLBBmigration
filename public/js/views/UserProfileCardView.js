define(['jquery', 'backbone','../../templates/US/en/userProfileCard'], function($, Backbone){

    return UserProfileCardView = Backbone.View.extend({

        initialize   : function(){
            this.model.on('change', this.render, this);
        },
        render       : function(){
            var self = this;
            dust.render('userProfileCard', this.model.toJSON(), function(err, out){
                self.$el.html(out);
            });
        }
    });
});

