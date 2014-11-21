define(["jquery","underscore","backbone", "views/WishView"], function($, _, Backbone, WishView){

    var WishListView = Backbone.View.extend({

        tagName     : "ul",
        className   : "thumbnails wishes",

        initialize: function(){
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.render, this);
        },

        addOne: function(wish){
            var wishView = new WishView({model: wish});
            wishView.render();
            this.$el.append(wishView.el);
        },
        addAll: function(){
            console.log(this.collection);
          this.collection.forEach(this.addOne, this);
        },
        render: function(){
            this.addAll();
        }
    });

    return WishListView;

});

