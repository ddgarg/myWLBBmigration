define(['jquery', 'backbone','formvalidate','../../templates/US/en/userAddressInModal'], function ($, Backbone) {

    return Backbone.View.extend({

        tagName      : 'form',
        className    : 'addressmainform',
        events: {
            'click button#addressformcancel'       : 'removeclasses',
            'click button#addressformedit'         : 'editaddress',
            'click button#confirm-delete-address'  : 'deleteaddress'
        },
        saveaddress: function () {
            $('#addressModal')
                .on('hidden.bs.modal', function() {
                }).modal('hide');

            $('.addressdata').addClass('present');
            $('.addressform').addClass('present ');
            this.model.saveaddress($(this.el).serializeArray());
            Backbone.pubSub.trigger('addressUpdated', {});

        },

        deleteaddress: function(){
            this.model.destroy();
            $('#addressModal')
                .on('shown.bs.modal', function() {
                }).modal('hide');
            Backbone.pubSub.trigger('addressDeleted', {});
        },

        removeclasses: function () {
            $('.addressdata').removeClass('editing present absent');
            $('.addressform').removeClass('editing present absent');
            this.render();
            $('#addressModal')
                .on('hidden.bs.modal', function() {
                }).modal('hide');
        },

        editaddress: function () {
            $('.addressdata').removeClass('present absent');
            $('.addressform').removeClass('present absent');
            $('.addressdata').addClass('editing');
            $('.addressform').addClass('editing');
        },

        initialize: function () {
            this.model.on('change', this.render, this);
            this.activatevalidation();
            Backbone.pubSub.on('updateAddress',  this.render, this);
            Backbone.pubSub.on('saveAddress',  this.saveaddress, this );
        },
        render: function () {
            var self = this;
            dust.render('userAddressInModal', this.model.toJSON(), function (err, out) {
                self.$el.html(out);
            });
        },

        activatevalidation: function(){
            var formelement = this.el;
            $(formelement).submit(function(e){
                e.preventDefault();
            }).validate({
		          rules : {
		           name     : {
		            minlength : 3 ,
		            maxlength : 15 ,
		            required  : true
		           } ,
		           address1 : {
		            minlength : 3 ,
		            maxlength : 40 ,
		            required  : true
		           } ,
		           address2 : {
		            minlength : 3 ,
		            maxlength : 40 ,
		            required  : true
		           } ,
		           city     : {
		            minlength : 2 ,
		            maxlength : 20 ,
		            required  : true
		           } ,
		           state    : {
		            minlength : 2 ,
		            maxlength : 20 ,
		            required  : true
		           } ,
		           pincode  : {
		            minlength : 6 ,
		            maxlength : 6 ,
		            required  : true
		           } ,
		           country  : {
		            minlength : 3 ,
		            maxlength : 10 ,
		            required  : true
		           }
		          } ,
                highlight: function(element) {
                    $(element).closest('.form-group').addClass('has-error');
                },
                unhighlight: function(element) {
                    $(element).closest('.form-group').removeClass('has-error');
                },
                errorElement: 'span',
                errorClass: 'help-block',
                errorPlacement: function(error, element) {
                    if(element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                },
                submitHandler: function(result){
                    Backbone.pubSub.trigger('saveAddress', {});
                    return false;

                }
            });
        }
    });
});

