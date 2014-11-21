define(["jquery","underscore","backbone", "views/BdayView"], function($, _, Backbone, BdayView){

    var BdayListView = Backbone.View.extend({

        tagName     : "ul",
        className   : "upcomingbdays",

        initialize: function(){
            this.collection.on('reset', this.render, this);
        },

        addOne: function(bday){
            var bdayView = new BdayView({model: bday});
            bdayView.render();
            this.$el.append(bdayView.el);
        },
        addAll: function(){
            this.collection.forEach(this.addOne, this);
        },
        render: function(){
            this.addAll();
        }
    });

    return BdayListView;

});

