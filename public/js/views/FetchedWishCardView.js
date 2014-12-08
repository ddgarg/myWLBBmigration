define(['jquery','backbone', '../../templates/US/en/fetchedWishCard'], function($,  Backbone){

    return Backbone.View.extend({

        tagName     : 'li',
        className   : 'col-md-3 fetchedproducts',
        initialize: function(){
            this.model.on('change', this.render, this);
        },
        render: function(){
            var self = this;
            dust.render('fetchedWishCard', this.model.toJSON(), function(err, out){
                self.$el.html(out);
                self.$el.attr('id', self.model.get('asin'));
            });
        },

        events: {
            'click button.deleteProduct'    : 'showDeleteProductConfirmation',
            'click button.add-to-wishlist'  : 'addToWishList',
            'click button.btn-remove-from-wishlist' :'removeFromWishList'
        },

        addToWishList: function(){
            this.model.set({'isNew':true, 'itemAdded' : true});
            this.flyToWishlist();
            Backbone.pubSub.trigger('addToWishlist', this.model.toJSON());
        },

        removeFromWishList: function(){
            this.model.set({'isNew':false, 'itemAdded' : false});
            Backbone.pubSub.trigger('removeFromWishlist', this.model.toJSON());
        },

        flyToWishlist: function(){
            var wishlist = $('.fa-gift-fly');
            var imgtodrag = this.$el.find('.item_image');
            if (imgtodrag) {
                var imgclone = imgtodrag.clone()
                    .offset({
                        top: imgtodrag.offset().top,
                        left: imgtodrag.offset().left
                    })
                    .css({
                        'opacity': '0.5',
                        'position': 'absolute',
                        'height': '150px',
                        'width': '150px',
                        'z-index': '1100'
                    })
                    .appendTo($('body'))
                    .animate({
                        'top': wishlist.offset().top + 10,
                        'left': wishlist.offset().left + 10,
                        'width': 50,
                        'height': 75
                    }, 1000, 'easeInOutExpo');
                setTimeout(function () {
                    wishlist.effect('shake', {
                        times: 2
                    }, 200);
                }, 1000);
                imgclone.animate({
                    'width': 0,
                    'height': 0
                }, function () {
                    $(this).detach();
                });
            }
        }

    });
});

