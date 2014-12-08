define(['jquery','backbone','../../templates/US/en/userHome'], function($, Backbone){

    return Backbone.View.extend({

        className    : 'homeview',
        render       : function(){

            var self = this;
            dust.render('userHome', this.model.toJSON(), function(err, out){

                self.$el.html(out);
	             searchWishFormView.render();
                self.$el.find('.home-wish-search').html(searchWishFormView.el);
                self.$el.find('.home-wish-search-modal').html(searchWishFormModalView.el);

                bdayListView.$el.empty();
                bdayListCollection.fetch({'reset':true,'success': function(){
                    self.$el.find('.upcomingbdaysdiv').html(bdayListView.el);
                }});

	            userProfileCardModel.fetch({'success': function(user){
                    self.$el.find('#userdetails').html(userProfileCardView.el);
                    self.$el.find('#deliveryaddress').html(userAddressView.el);
                }});

               userWishListView.$el.empty();
	            userWishListCollection.fetch({'reset': true, 'success': function () {
                    self.$el.find('#wishlistdiv').html(userWishListView.el);
                }});

            });
        }
    });
});

