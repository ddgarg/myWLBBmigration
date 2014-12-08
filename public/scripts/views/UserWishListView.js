define(['jquery', 'backbone', 'views/UserWishView'], function($, Backbone, UserWishView){

    return Backbone.View.extend({

        tagName     : 'ul',
        className   : 'thumbnails wishes',

        initialize: function(){
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.render, this);

            Backbone.pubSub.on('addToWishlist',  this.addToWishList, this);
            Backbone.pubSub.on('removeFromWishlist',  this.removeFromWishList, this);
        },
        addOne: function(userWish){
            var userWishView = new UserWishView({model: userWish});
            this.$el.prepend(userWishView.el);
        },
        addAll: function(){
            this.collection.forEach(this.addOne, this);
        },
        render: function(){
            this.addAll();
        },
        addToWishList: function(wishData){
            return this.collection.create(wishData);
        },
        removeFromWishList: function(wishData){
            this.collection.removeWish(wishData);
        }
    });
});

