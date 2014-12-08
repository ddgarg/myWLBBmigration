define(['jquery','backbone', 'templates/userFriends'], function($, Backbone){

    return Backbone.View.extend({

        className   : 'friendView',

        render: function(){

            var self = this;
            dust.render('userFriends', this.model.toJSON(), function(err, out){
                self.$el.html(out);

                window.friends.bdayListView.$el.empty();
                window.friends.bdayListCollection.fetch({'reset':true,'success': function(){
                    self.$el.find('.upcomingbdaysdiv').html(window.friends.bdayListView.el);
                }});

                window.friends.friendOverviewCardListView.$el.empty();
                window.friends.friendOverviewCardListCollection.fetch({'reset': true, 'success': function () {
                    self.$el.find('#friendsdiv').html(window.friends.friendOverviewCardListView.el);
                }});

            });

        }
    });
});