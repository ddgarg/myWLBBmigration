/**
 * Created by vdogra on 11/11/14.
 */

$('form.contactformform').validate({
    rules: {
        name: {
            minlength: 3,
            maxlength: 15,
            required: true
        },
        address1: {
            minlength: 3,
            maxlength: 40,
            required: true
        },
        address2: {
            minlength: 3,
            maxlength: 40,
            required: true
        },
        city: {
            minlength: 2,
            maxlength: 20,
            required: true
        },
        state: {
            minlength: 2,
            maxlength: 20,
            required: true
        },
        pincode: {
            minlength: 6,
            maxlength: 6,
            required: true
        },
        country: {
            minlength: 3,
            maxlength: 10,
            required: true
        }
    },
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

    submitHandler: function(form){

        $.ajax({
            url: form.action,
            type: form.method,
            data: $(form).serialize(),
            success: function(response){
                var updatedAddressArray = $(form).serializeArray();

                updatedAddressArray[0].value = '<strong>' + updatedAddressArray[0].value + '</strong>';

                updatedAddressArray[5].value = updatedAddressArray[6].value + " - " + updatedAddressArray[5].value;

                updatedAddressArray.splice(6, 1);

                var addressText = "";
                var updatedAddressEle = $('address');

                $.each(updatedAddressArray, function (i){

                    addressText = addressText + updatedAddressArray[i].value + "<br/>";

                });

                $('#addressModal').modal('hide');

                notificationGrowl({
                    icon: 'glyphicon glyphicon-ok',
                    title: ' Address updated: ',
                    message: 'Your delivery address has been updated successfully!'
                },{
                    element: 'body',
                    type: "success",
                    allow_dismiss: true,
                    placement: {
                        from: "top",
                        align: "center"
                    },
                    offset : {
                        x: 0,
                        y:50
                    } ,
                    spacing: 100,
                    z_index: 1031,
                    delay: 6000,
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

                updatedAddressEle.html(addressText);

            },
            error : function (xhr, textstatus, error) {
                alert(error);
            }
        });
    }
});

$(document).on("click", ".deleteProduct", function () {

    var asin = $(this).attr('id');
    console.log(asin);
    $("#confirmProductDelete").val(asin);
});

var removeBackdrop = function(){
    $('.loading-wishes-backdrop').addClass('hide');
};

jQuery.fn.ajaxify = function (selector, success, error) {

    if (arguments.length === 2) {
        error = success;
        success = selector;
        selector = undefined;
    }

    return this.on('submit', function (e) {

        $('.loading-wishes-backdrop').removeClass('hide');

        setTimeout(function(){
            notificationGrowl({
                icon: 'glyphicon glyphicon-ok',
                title: ' Loading wishes: ',
                message: "We're fetching your wishes!"
            },{
                element: 'body',
                type: "info",
                allow_dismiss: true,
                placement: {
                    from: "top",
                    align: "right"
                },
                offset : {
                    x: 0,
                    y:400
                } ,
                onHide: removeBackdrop,
                spacing: 0,
                z_index: 1051,
                delay: 3000,
                timer: 1000,
                mouse_over: false,
                animate: {
                    enter: 'animated bounceIn',
                    exit: 'animated bounceOut'
                },
                icon_type: 'class',
                template: '<div data-growl="container" class="alert loading-wishes" role="alert"> \
                                    <button type="button" class="close" data-growl="dismiss"> \
                                        <span aria-hidden="true">×</span> \
                                        <span class="sr-only">Close</span> \
                                    </button>\
                                    <div>\
                                    <h3 class="text-center"><i class=" fa fa-4x fa-spinner fa-spin"></i></h3>\
                                       <h2 class="text-center"> \
                                        <strong><span data-growl="title"></span></strong> \
                                        <span data-growl="message"></span>\
                                        </h2>\
                                     </div>\
                                 </div>'
            });
        },0);


//        var loaderDiv = $('#loader-div');
//        $('div#loader-div > div').remove();
//
//        var Odiv = $('<div/>')
//            .addClass('loader')
//            .appendTo(loaderDiv);

        jQuery.ajax({
            url: this.action,
            method: this.method || 'GET',
            data: (typeof selector === 'undefined' ? $(this).serialize() : $(this).find(selector).serialize())
        }).done(jQuery.proxy(success, this)).fail(jQuery.proxy(error, this));

        e.preventDefault();
    });
};

function displayAddress() {

    $.ajax({
        url: '/user/address',
        type: 'get',
        success: function (data) {

            if (data.address1) {
                var name = data.name;
                var address1 = data.address1;
                var address2 = data.address2;
                var city = data.city;
                var state = data.state;
                var pincode = data.pincode;
                var country = data.country;
                var addressText = '<strong>' + name + '</strong>' + '<br>' + address1 + '<br>' + address2 + '<br>' + city + '<br>'
                    + state + '-' + pincode + '<br>' + country;

                var addressDiv = $('.addressDiv');
                $('div.addressDiv > address').remove();
                addressDiv.removeClass('hide');
                $('.addressdivbuttons').removeClass('hide');

                $('.contactform').addClass('hide');
                $('.contactformbuttons').addClass('hide');

                var addressField = $('<address/>')
                    .append(addressText)
                    .prependTo(addressDiv);
                $('#username').attr('value', name);
                $('#address1').attr('value', address1);
                $('#address2').attr('value', address2);
                $('#city').attr('value', city);
                $('#state').attr('value', state);
                $('#pincode').attr('value', pincode);
                $('#country').attr('value', country);
                $('#addressModal').modal('show');
            }

            else {
                console.log(data);
                $('.addressDiv').addClass('hide');
                $('.addressdivbuttons').addClass('hide');
                $('.contactform').removeClass('hide');
                $('.contactformbuttons').removeClass('hide');
                $('#addressModal').modal('show');
            }
        }
    });
}

function editAddress() {

    $('.addressDiv').addClass('hide');
    $('.addressdivbuttons').addClass('hide');
    $('.contactform').removeClass('hide');
    $('.contactformbuttons').removeClass('hide');
}

function deleteProduct(asin) {
    console.log(asin);

    $.ajax({
        url: '/products/deleteproduct',
        method: 'DELETE',
        cache: false,
        data: {"asin": asin}
    }).done(function (response) {
            $('li.fetchedproducts#' + asin).find('.item-added-removed').remove();
            console.log(response);
            removeAsinFromGlobalArray(asin);
            var liDiv = 'li.main-wishlist-li#' + asin;
            $(liDiv).fadeOut(1000);

            setTimeout(function(){
                notificationGrowl({
                    icon: 'glyphicon glyphicon-ok',
                    title: ' Item Removed'
//                    message: 'Item Successfully Removed From Wishlist!'
                },{
                    element: 'li.fetchedproducts#' + asin,
                    type: "info",
                    allow_dismiss: true,
                    placement: {
                        from: "top",
                        align: "left"
                    },
                    offset : {
                        x: 0,
                        y:50
                    } ,
                    spacing: 0,
                    z_index: 1051,
                    delay: 200000,
                    timer: 1000,
                    mouse_over: false,
                    animate: {
                        enter: 'animated bounceIn',
                        exit: 'animated bounceOut'
                    },
                    icon_type: 'class',
                    template: '<div data-growl="container" class="item-added-removed" style="padding:5px"> \
                                       <h6> <span data-growl="icon"></span> \
                                        <strong><span data-growl="title"></span></strong> \
                                        </h6>\
                                 </div>'
                });
            },1000);


        }).fail(function () {
            alert('failed');
        });
}

$(document).on("click", ".btn-remove-from-wishlist", function () {

    var productAsin = $(this).attr('value');
    $(this).addClass('hide');
    var parentLi = $('li.fetchedproducts#' + productAsin);
    parentLi.find('button.add-to-wishlist').removeClass('hide');
    parentLi.find(".badge").addClass("hide");
    $('.no-of-wishes').html(function (i, val) {
        return +val - 1
    });

    deleteProduct(productAsin);


});

$(document).on("click", ".delete-address", function () {

    $.ajax({
        url: '/user/address',
        method: 'DELETE',
        cache: false
    }).done(function (response) {

            window.location = "/mywishlist";


        }).fail(function () {

            window.location = "/mywishlist";
        });
});

$(document).on("click", ".add-to-wishlist", function () {


    var selector = "li.fetchedproducts#" + "" + this.id;
    var item_div_original = $(selector);
    var item_div = item_div_original.clone();
    var wishlist = $('.glyphicon-gift');

    var item_obj = {};
    item_obj.asin = this.id;
    item_obj.item_link = item_div.find(".item_link").attr("href");

    item_obj.item_image = item_div.find(".item_image").attr("src");

    item_obj.item_title = item_div.find(".item_title").text();

    item_obj.price = item_div.find(".price").text();

    item_div_original.find("button.add-to-wishlist").addClass("hide");
    item_div_original.find("button.btn-remove-from-wishlist")
        .removeClass('hide');
    var imgtodrag = item_div_original.find(".item_image");
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
            .css({
                'opacity': '0.5',
                'position': 'absolute',
                'height': '150px',
                'width': '150px',
                'z-index': '1100'
            })
            .appendTo($('body'))
            .animate({
                'top': wishlist.offset().top + 10,
                'left': wishlist.offset().left + 10,
                'width': 75,
                'height': 75
            }, 1000, 'easeInOutExpo');
        setTimeout(function () {
            wishlist.effect("shake", {
                times: 2
            }, 200);
        }, 1000);
        imgclone.animate({
            'width': 0,
            'height': 0
        }, function () {
            $(this).detach();
        });

        $('.no-of-wishes').html(function (i, val) {
            return +val + 1
        });
    }
    $.ajax({
        url: '/products/addtowishlist',
        method: 'POST',
        cache: false,
        data: item_obj
    }).done(function (response) {

            $(selector).find('.item-added-removed').remove();
            addAsinToGlobalArray(item_obj.asin);


            item_div_original.find("button.btn-remove-from-wishlist")
                .attr('value', item_obj.asin)
                .attr('id', response.productID);

            console.log(response);
            item_div.addClass('main-wishlist-li');
            item_div.removeClass('fetchedproducts');
            item_div_original.find(".badge").removeClass("hide");
            item_div_original.find(".badge-already-added").addClass("hide");
            item_div.attr("id", item_obj.asin);
            item_div.find('.thumbnail').removeClass('fetchedProduct');
            item_div.find(".thumbnail").prepend('<button type="button" id = ' + item_obj.asin + ' class="deleteProduct close" data-toggle="modal" data-target="#deleteConfirmationModal"><span>×</span><span class="sr-only">Close</span></button>');
            item_div.find(".thumbnail").prepend('<span class="badge badge-added pull-left" style="margin-bottom:10px">Newly Added</span>');

            item_div.find('.add-to-wishlist').remove();
            $(".wishes").prepend(item_div);

            setTimeout(function(){
                notificationGrowl({
                    icon: 'glyphicon glyphicon-ok',
                    title: ' Item Added'
//                    message: 'Item Successfully Added to Wishlist!'
                },{
                    element: selector,
                    type: "success",
                    allow_dismiss: false,
                    placement: {
                        from: "top",
                        align: "left"
                    },
                    offset : {
                        x: 15,
                        y:0
                    } ,
                    spacing: 0,
                    z_index: 1051,
                    delay: 200000,
                    timer: 100,
                    mouse_over: false,
                    animate: {
                        enter: 'animated bounceIn',
                        exit: 'animated bounceOut'
                    },
                    icon_type: 'class',
                    template: '<div data-growl="container" class="item-added-removed" style="padding:5px"> \
                                       <h6> <span data-growl="icon"></span> \
                                        <strong><span data-growl="title"></span></strong> \
                                        </h6>\
                                 </div>'
                })}, 1200);




        }).fail(function () {

            alert('failed');
        });


});

$(document).ready(function () {

    var substringMatcher = function () {

        var strs = [];

        return function findMatches(q, cb) {
            var matches, substrRegex;
            matches = [];
            var i = 1;

            substrRegex = new RegExp(q, 'i');

            $('.typeahead').bind('input', function () {

                strs = [];
                var searchQuery = $(this).val();
                var searchQueryLength = searchQuery.length;
                if (searchQueryLength >= 3) {
                    $.ajax({
                        url: 'https://completion.amazon.com/search/complete',
                        method: 'POST',
                        dataType: 'jsonp',
                        cache: false,
                        data: {
                            client: 'amazon-search-ui',
                            mkt: 1,
                            'search-alias': 'aps',
                            q: searchQuery
                        }
                    }).done(function (response) {
                            strs = response[1];

                        }).fail(function () {
                            console.log('error');
                        });
                }
            });

            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push({ value: str });
                }
            });

            cb(matches);
        };
    };

    $('.typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'states',
            displayKey: 'value',
            source: substringMatcher()
        });


    $('.upcomingbdays').vTicker('init',
        {
            speed: 1000,
            pause: 1000,
            showItems: 3,
            padding: 4
        }
    );

    $('form.searchwishform').ajaxify(function (response) {

        $(".loading-wishes").fadeOut("fast");
        $('.loading-wishes-backdrop').addClass('hide');

        if (response.error === 'error') {
            $("#notification-div").removeClass("alert-hide");
            $('ul#fetchedProducts.thumbnails > li').remove();
        }
        else {
            $('.no-of-wishes').text(globalAsinArray.length);

            $("#notification-div").addClass("alert-hide");

            var fetchedProds = response.products;

            var pList = $('ul#fetchedProducts.thumbnails');

            $('ul#fetchedProducts.thumbnails > li').remove();

            $.each(fetchedProds, function (i) {
                if (fetchedProds[i].asin) {

                    var li = $('<li/>')
                        .addClass('col-md-3 fetchedproducts')
                        .attr('id', fetchedProds[i].asin)
                        .appendTo(pList);

                    var Odiv = $('<div/>')
                        .addClass('thumbnail fetchedProduct')
                        .appendTo(li);
                    if (globalAsinArray.indexOf(fetchedProds[i].asin) > -1) {
                        $('<span/>')
                            .addClass('badge badge-already-added  pull-right')
                            .text('Already Added')
                            .appendTo(Odiv);
                    }
                    var badgeSpan = $('<span/>')
                        .addClass('badge badge-added pull-right hide')
                        .text('Added')
                        .appendTo(Odiv);
                    var aDiv = $('<div/>')
                        .addClass('prod-desc')
                        .appendTo(Odiv);
                    var aImg = $('<a/>')
                        .addClass('item_link')
                        .attr('href', fetchedProds[i].item_link)
                        .attr('target', '_blank')
                        .appendTo(aDiv);
                    var Img = $('<img/>')
                        .addClass('item_image')
                        .attr('src', fetchedProds[i].item_image)
                        .appendTo(aImg);
                    var Idiv = $('<div/>')
                        .addClass('caption')
                        .appendTo(Odiv);
                    var Tp = $('<p/>')
                        .addClass('text-center item_title')
                        .text(fetchedProds[i].item_title)
                        .appendTo(Idiv);
                    var pDiv = $('<div/>')
                        .addClass('price-div')
                        .appendTo(Odiv);
                    var Va = $('<a/>')
                        .addClass('item_link')
                        .attr('href', fetchedProds[i].item_link)
                        .attr('target', '_blank')
                        .appendTo(pDiv);
                    Va.append('<a href=' + fetchedProds[i].item_link + ' target="_blank"><img src="http://g-ec2.images-amazon.com/images/G/31/associates/promohub/amazonIN_logo_200_75.jpg?tag-id=giftnwishcom-21" class="amazon-logo pull-left" border="0" alt="In Association with Amazon.in"></a>');
                    var priceTag = $('<h4/>')
                        .appendTo(pDiv);
                    var Vs = $('<span/>')
                        .addClass('pull-right label label-success price')
                        .text(fetchedProds[i].price)
                        .appendTo(priceTag);

                    if (globalAsinArray.indexOf(fetchedProds[i].asin) > -1) {
                        $('<button/>')
                            .addClass('btn btn-primary btn-danger btn-remove-from-wishlist pull-right')
                            .text('Remove from Wishlist')
                            .attr('value', fetchedProds[i].asin)
                            .appendTo(Odiv);
                        $('<button/>')
                            .addClass('btn btn-primary add-to-wishlist hide pull-right')
                            .attr('id', fetchedProds[i].asin)
                            .text('Add to Wish List')
                            .appendTo(Odiv);
                    }
                    else {
                        $('<button/>')
                            .addClass('btn btn-primary btn-danger btn-remove-from-wishlist hide pull-right')
                            .text('Remove from Wishlist')
                            .appendTo(Odiv);
                        $('<button/>')
                            .addClass('btn btn-primary add-to-wishlist  pull-right')
                            .attr('id', fetchedProds[i].asin)
                            .text('Add to Wish List')
                            .appendTo(Odiv);
                    }
                }
            });
        }
        $('#myModal').modal('show');
    }, function (xhr, error) {
        $.notify("Sorry no matches found...");
    });
});