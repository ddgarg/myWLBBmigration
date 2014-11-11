/**
 * Created by vdogra on 11/11/14.
 */

$(document).on("click", ".deleteProduct", function () {

    var asin = $(this).attr('id');
    console.log(asin);
    $("#confirmProductDelete").val(asin);
});

jQuery.fn.ajaxify = function (selector, success, error) {

    if (arguments.length === 2) {
        error = success;
        success = selector;
        selector = undefined;
    }

    return this.on('submit', function (e) {
        var loaderDiv = $('#loader-div');
        $('div#loader-div > div').remove();

        var Odiv = $('<div/>')
            .addClass('loader')
            .appendTo(loaderDiv);

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
            console.log(response);
            removeAsinFromGlobalArray(asin);
            var liDiv = 'li.main-wishlist-li#' + asin;
            $(liDiv).fadeOut(1000);
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

    $.ajax({
        url: '/products/addtowishlist',
        method: 'POST',
        cache: false,
        data: item_obj
    }).done(function (response) {

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
                }, 1500);
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
        }).fail(function () {

            alert('failed');
        });
});

$(document).ready(function () {

    $('button#contactformsubmit').click(function (e) {

        e.preventDefault();
        $.ajax({
            url: '/user/address',
            type: 'post',
            dataType: 'json',
            data: $('form.contactform').serialize(),
            success: function (data) {
                console.log(data);

                $('#addressModal').modal('hide');

            }
        });

        return false;
    });

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

    $('form').ajaxify(function (response) {

        $(".loader").fadeOut("slow");

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
    })
});