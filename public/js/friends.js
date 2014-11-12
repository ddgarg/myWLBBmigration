/**
 * Created by vdogra on 11/11/14.
 */

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
jQuery(document).ready(function ($) {

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

    var bestPictures = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: '/giftsreceived/getfriendsSuggestions'
    });

    bestPictures.initialize();

    $('.typeahead').typeahead(null, {
        name: 'best-pictures',
        hint: true,
        displayKey: 'name',
        source: bestPictures.ttAdapter(),
        templates: {
            empty: [
                '<div class="empty-message" style="padding: 10px">',
                'Unable to find your friend. Inform them about this app :)',
                '</div>'
            ].join('\n'),
            suggestion: Handlebars.compile('<a href="/friends/{{~lb}id{~rb}}"><img src="{{~lb}picture{~rb}}"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{~lb}name{~rb}}</strong></img></a>')

        }
    });
});