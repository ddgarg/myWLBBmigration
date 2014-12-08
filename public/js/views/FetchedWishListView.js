define(['jquery', 'backbone', 'views/FetchedWishCardView'], function($, Backbone, FetchedWishCardView){

    return Backbone.View.extend({

        tagName     : 'ul',
        className   : 'thumbnails fetchedwishes',

        initialize: function(){
            Backbone.pubSub.on('showSearchResults',  this.render, this);
        },

        addOne: function(fetchedWishCardModel){
            var fetchedWishCardView = new FetchedWishCardView({model: fetchedWishCardModel});
            fetchedWishCardView.render();
            this.$el.append(fetchedWishCardView.el);
        },
        addAll: function(){
            this.collection.forEach(this.addOne, this);
        },
        render: function(){
            Backbone.pubSub.trigger('searchingResultsHide', {});
            $('#searchedwishes > ul').remove();
            this.$el.children().remove();
            this.addAll();

            $('#fetchedWishModal')
                .on('shown.bs.modal', function() {
                }).modal('show');

            $('#searchedwishes').html(this.el);

        }
    });

});
