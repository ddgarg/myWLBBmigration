define(['jquery','backbone', 'views/FriendWishCardView'], function($, Backbone, FriendWishCardView){

    return Backbone.View.extend({

        tagName     : 'ul',
        className   : 'thumbnails wishes',

        initialize: function(){
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.render, this);
        },

        addOne: function(friendWishCard){
            var friendWishCardView = new FriendWishCardView({model: friendWishCard});
            this.$el.prepend(friendWishCardView.el);
        },
        addAll: function(){
            this.collection.forEach(this.addOne, this);
        },
        render: function(){
            this.addAll();
        }
    });


});

