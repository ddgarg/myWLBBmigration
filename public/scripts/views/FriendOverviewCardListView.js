define(['jquery','backbone', 'views/FriendOverviewCardView'], function($, Backbone, FriendOverviewCardView){

    return Backbone.View.extend({

        tagName     : 'ul',
        className   : 'thumbnails',
        initialize: function(){
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.render, this);
        },
        addOne: function(friendOverview){
            var friendOverviewCardView = new FriendOverviewCardView({model: friendOverview});
            this.$el.prepend(friendOverviewCardView.el);
        },
        addAll: function(){
            this.collection.forEach(this.addOne, this);
        },
        render: function(){
            this.addAll();
        }
    });

});

