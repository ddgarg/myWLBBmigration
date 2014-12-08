define(['jquery','jqueryui','backbone'], function($, jQuery, Backbone){

    return Backbone.View.extend({

	     tagName   : 'form' ,
	     className : 'form-inline' ,
        template  : '<input name="wish" class="form-control input-lg" type="text" placeholder="Make a wish...">\
        <button type="submit" class="btn btn-success btn-lg"><i class="fa fa-search"></i></button>',

        events: {
	        'input input'         : 'suggest' ,
	        'click .ui-menu-item' : 'searchWishes' ,
	        'submit'              : 'searchWishes'
        },
        initialize: function(){
            this.render();
        },
        activateAutoComplete: function(){
            this.$search.autocomplete({
                source: function( request, response ) {

                    $.ajax({
                        url: 'https://completion.amazon.com/search/complete',
                        method: 'POST',
                        dataType: 'jsonp',
                        cache: false,
                        data: {
                            client: 'amazon-search-ui',
                            mkt: 1,
                            'search-alias': 'aps',
                            q: request.term
                        },
                        success: function( data ) {
                            response( data[1] );
                        }
                    });
                },
                select: _.bind(function( event, ui ) {
                    var term = ui.item ? ui.item.value : false;
                    if (term) {
                        this.$search.autocomplete( 'close' );
                        this.$el.find('input').val(term);
                        this.searchWishes(event);
                    }
                }, this)
            });
        },
        render: function(){
            this.$el.html(this.template);
	         this.$search = this.$el.find('input');
	         this.collection.on('reset', this.activateAutoComplete, this);
	         this.activateAutoComplete();
        },
        searchWishes: function(e){
            Backbone.pubSub.trigger('searchingResults', {});
            e.preventDefault();
            this.collection.performSearch(this.$('input[name=wish]').val());
        },
        suggest: function(){
            var query = this.$('input[name=wish]').val();
            this.$search.val(query);
        }

	});
});

