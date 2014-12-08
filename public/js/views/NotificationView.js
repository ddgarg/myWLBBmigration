define(['jquery', 'backbone','growlfn'], function($, Backbone){

    return Backbone.View.extend({

        initialize: function(){
            Backbone.pubSub.on('searchingResults',  this.searchingResults, this);
            Backbone.pubSub.on('searchingResultsHide',  this.searchingResultsHide, this);
            Backbone.pubSub.on('addToWishlist',  this.itemAdded, this);
            Backbone.pubSub.on('removeFromWishlist',  this.itemRemoved, this);
            Backbone.pubSub.on('addressDeleted',  this.addressDeleted, this);
            Backbone.pubSub.on('addressUpdated',  this.addressUpdated, this);

        },

        searchingResults: function(){
            $('.loading-wishes-backdrop').removeClass('hide');

            $('body').append('<div id="loader">\
                <i class="fa fa-refresh fa-spin fa-9x"></i>\
            </div>');
        },
        searchingResultsHide: function(){
            $('#loader').remove();
            $('.loading-wishes-backdrop').addClass('hide');

        },
        itemAdded: function(wish){

            var selectorText = 'li.fetchedproducts#' + wish.asin.toString();
            var selector = $(selectorText);
            notificationGrowl({
                icon: 'fa fa-check-circle',
                title: ' Item Added'
//                    message: 'Item Successfully Added to Wishlist!'
            },{
                element: selector,
                type: 'success',
                allow_dismiss: false,
                placement: {
                    from: 'top',
                    align: 'left'
                },
                offset : {
                    x: 15,
                    y:0
                } ,
                spacing: 0,
                z_index: 1051,
                delay: 500,
                timer: 100,
                mouse_over: false,
                animate: {
                    enter: 'animated bounceIn',
                    exit: 'animated bounceOut'
                },
                icon_type: 'class',
                template: '<div data-growl="container" class="item-added-removed" style="padding:5px"> \
                                       <h4> <span data-growl="icon"></span> \
                                        <strong><span data-growl="title"></span></strong> \
                                        </h4>\
                                 </div>'
            });
        },

        itemRemoved: function(wish) {
            var selectorText = 'li.fetchedproducts#' + wish.asin.toString();
            var selector = $(selectorText);
            notificationGrowl({
                icon: 'fa fa-minus-circle',
                title: ' Item Removed'
//                    message: 'Item Successfully Removed From Wishlist!'
            },{
                element: selector,
                type: 'danger',
                allow_dismiss: false,
                placement: {
                    from: 'top',
                    align: 'right'
                },
                offset : {
                    x: 15,
                    y: 0
                } ,
                spacing: 0,
                z_index: 1051,
                delay: 500,
                timer: 1000,
                mouse_over: false,
                animate: {
                    enter: 'animated bounceIn',
                    exit: 'animated bounceOut'
                },
                icon_type: 'class',
                template: '<div data-growl="container" class="item-added-removed" style="padding:5px"> \
                                       <h4> <span data-growl="icon"></span> \
                                        <strong><span data-growl="title"></span></strong> \
                                        </h4>\
                                 </div>'
            })
        },

        addressDeleted: function(){

            $('.modal-backdrop').remove();
            notificationGrowl({
                icon: 'fa fa-times-circle',
                title: ' Address deleted: ',
                message: 'Your delivery address has been deleted successfully!'
            },{
                element: 'body',
                type: 'danger',
                allow_dismiss: true,
                placement: {
                    from: 'top',
                    align: 'center'
                },
                offset : {
                    x: 0,
                    y:50
                } ,
                spacing: 0,
                z_index: 1051,
                delay: 3000,
                timer: 1000,
                mouse_over: false,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                icon_type: 'class',
                template: '<div data-growl="container" class="alert" role="alert"> \
                                    <button type="button" class="close" data-growl="dismiss"> \
                                        <span aria-hidden="true">×</span> \
                                        <span class="sr-only">Close</span> \
                                    </button>\
                                    <div style="padding:20px">\
                                       <h4> <span data-growl="icon"></span> \
                                        <strong><span data-growl="title"></span></strong> \
                                        <span data-growl="message"></span>\
                                        </h4>\
                                     </div>\
                                 </div>'
            });

        },

        addressUpdated: function(){
            notificationGrowl({
                icon: 'fa fa-check-circle',
                title: ' Address updated: ',
                message: 'Your delivery address has been updated successfully!'
            },{
                element: 'body',
                type: 'success',
                allow_dismiss: true,
                placement: {
                    from: 'top',
                    align: 'center'
                },
                offset : {
                    x: 0,
                    y:50
                } ,
                spacing: 0,
                z_index: 1031,
                delay: 3000,
                timer: 1000,
                mouse_over: false,
                animate: {
                    enter: 'animated fadeInDown',
                    exit: 'animated fadeOutUp'
                },
                icon_type: 'class',
                template: '<div data-growl="container" class="alert" role="alert"> \
                                    <button type="button" class="close" data-growl="dismiss"> \
                                        <span aria-hidden="true">×</span> \
                                        <span class="sr-only">Close</span> \
                                    </button>\
                                    <div style="padding:20px">\
                                       <h4> <span data-growl="icon"></span> \
                                        <strong><span data-growl="title"></span></strong> \
                                        <span data-growl="message"></span>\
                                        </h4>\
                                     </div>\
                                 </div>'
            });

        }
    });
});
