define(['jquery', 'backbone', 'views/BdayView'], function($, Backbone, BdayView){

    return Backbone.View.extend({

        tagName     : 'ul',
        className   : 'upcomingbdays',

        initialize: function(){
            this.collection.on('reset', this.render, this);
        },

        addOne: function(bdayModel){
            var bdayView = new BdayView({model: bdayModel});
            bdayView.render();
            this.$el.append(bdayView.el);
        },
        addAll: function(){
            this.collection.forEach(this.addOne, this);
        },
        render: function(){
            this.addAll();
            this.activatevticker();
        },
        activatevticker: function(){
            $('.upcomingbdaysdiv').vTicker('init',
                {
                    speed: 1000,
                    pause: 1000,
                    showItems: 2,
                    padding: 4
                }
            );
        }
    });
});

