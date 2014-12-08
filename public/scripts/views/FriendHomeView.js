define(['jquery','backbone','templates/friendHome'], function($, Backbone){

    return Backbone.View.extend({

        className   : 'friendWishListView',

        render: function(friendId){

            var self = this;
            dust.render('friendHome', this.model.toJSON(), function(err, out){
                self.$el.html(out);

                // Clear the address before fetching address for new friend
                window.friendWL.friendAddressModel.clear();
                window.friendWL.friendAddressModel.setUserId(friendId);
                window.friendWL.friendAddressModel.fetch({'reset': true, 'success': function () {
                    window.friendWL.friendAddressView.$el.empty();
                    window.friendWL.friendAddressView.render();
                    self.$el.find('#deliveryaddress').html(window.friendWL.friendAddressView.el);
                }});

                window.friends.bdayListView.$el.empty();
                window.friends.bdayListCollection.fetch({'reset':true,'success': function(){
                    self.$el.find('.upcomingbdaysdiv').html(window.friends.bdayListView.el);
                }});

                window.friendWL.friendProfileCardView.$el.empty();
                window.friendWL.friendProfileCardModel.setUserId(friendId);
                window.friendWL.friendProfileCardModel.fetch({'success': function(){
                    window.friendWL.friendProfileCardView.render();
                    self.$el.find('#userdetails').html(window.friendWL.friendProfileCardView.el);
                }});

                window.friendWL.friendWishListView.$el.empty();
                window.friendWL.friendWishListModel.setUserId(friendId);
                window.friendWL.friendWishListModel.fetch({'reset': true, 'success': function () {
                    self.$el.find('#wishlistdiv').html(window.friendWL.friendWishListView.el);
                }});

            });

        }
    });
});

