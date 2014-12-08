define(["jquery", "backbone","models/FetchedWishCardModel"], function($, Backbone, FetchedWishCardModel){

    return Backbone.Collection.extend({

        model: FetchedWishCardModel,
        url: "/wishes/search",

        performSearch: function(wishQuery){
            this.reset();
            this.fetch({'cache':false, 'data': {query: wishQuery}, success: function(){
                Backbone.pubSub.trigger('showSearchResults', {});
            }});
        }
    });

});