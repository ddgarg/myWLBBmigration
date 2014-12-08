$(function() {
    var bestPictures = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: '/user/getfriendsSuggestions'
    });

    bestPictures.initialize();

    $('#friendsearch').typeahead(null, {
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
            suggestion: _.template('<a href="#friendWL/<%=id%>"><img src="<%=picture%>"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<%=name%></strong></img></a>')

        }
    });
});