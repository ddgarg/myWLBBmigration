(function(){dust.register("friendswishlist",body_0);var blocks={'body':body_1};function body_0(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.partial("layouts/master",ctx,null);}function body_1(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<div class=\"container main-wrapper\" style=\"border-bottom: 1px solid hsl(163, 5%, 36%);\"><div class=\"navbar-header\"><button class=\"navbar-toggle\" type=\"button\" data-toggle=\"collapse\" data-target=\".bs-navbar-collapse\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"./\" class=\"navbar-brand\" style=\"font-size: 30px\"><i>My Wish List</i></a></div><nav class=\"collapse navbar-collapse bs-navbar-collapse\" role=\"navigation\"><ul class=\"nav navbar-nav navbar-right\"><li><a href=\"/mywishlist\">My Wish List</a></li><li><a href=\"/giftsreceived\">Gift Received</a></li><li><a href=\"/friends\">Friend's Wish List</a></li><li class=\"dropdown\"><a id=\"drop6\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"./\">More <span class=\"caret\"></span></a><ul id=\"menu3\" class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"drop6\"><li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"http://twitter.com/fat\">Another action</a></li><li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"http://twitter.com/fat\">Something else here</a></li><li role=\"presentation\" class=\"divider\"></li><li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"http://twitter.com/fat\">Separated link</a></li></ul></li><li><a class=\"logout\" role=\"menuitem\" tabindex=\"-1\" onclick=\"fblogout();\">Logout</a></li></ul></nav></div><style>.thumbnail {padding:14px;}</style><script><!--$(document).on(\"click\", \".deleteProduct\", function () {var productID = $(this).data('id');console.log(productID);$(\"#confirmProductDelete\").val( productID );}); --><!--jQuery.fn.ajaxify = function (selector, success, error) {if (arguments.length === 2) {error = success;success = selector;selector = undefined;}return this.on('submit', function (e) {var loaderDiv   = $('#loader-div');$('div#loader-div > div').remove();var Odiv = $('<div/>').addClass('loader').appendTo(loaderDiv);jQuery.ajax({url: this.action,method: this.method || 'GET',data: (typeof selector === 'undefined' ? $(this).serialize() : $(this).find(selector).serialize())}).done(jQuery.proxy(success, this)).fail(jQuery.proxy(error, this));e.preventDefault();});};--><!--function deleteProduct(value) {console.log(value);$.ajax({url: '/products/deleteproduct',method: 'DELETE',cache: false,data: {\"productID\" : value}}).done(function(response){console.log(response);var liDiv = 'li#' + value;$(liDiv).fadeOut(1000);}).fail(function(){alert('failed');});}--><!--function addToWL(id){var selector = \"li#\" + id;var item_div_original = $(selector);var item_div    = item_div_original.clone();var item_obj = {};item_obj.asin         =   id;item_obj.item_link    =   item_div.find(\".item_link\").attr(\"href\");item_obj.item_image   =   item_div.find(\".item_image\").attr(\"src\");item_obj.item_title   =   item_div.find(\".item_title\").text();item_obj.price        =   item_div.find(\".price\").text();console.log(item_obj);$.ajax({url: '/products/addtowishlist',method: 'POST',cache: false,data: item_obj}).done(function(response){console.log(response);item_div_original.find(\".badge\").removeClass(\"hide\");item_div.attr(\"id\", response.productID);item_div.find(\".thumbnail\").addClass(\"main-box\").removeClass(\"thumbnail\");item_div.find(\".main-box\").prepend('<button type=\"button\" class=\"deleteProduct close\" data-toggle=\"modal\" data-target=\"#deleteConfirmationModal\"><span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span></button>');item_div.find(\".deleteProduct\").attr(\"data-id\", response.productID);item_div.find(\".main-box\").prepend('<span class=\"badge badge-added pull-left\" style=\"margin-bottom:10px\">Newly Added</span>');item_div.find('.btn-addtowishlist').remove();$(\".wishes\").prepend(item_div);}).fail(function(){alert('failed');});}--><!-- jQuery(document).ready(function ($) {var substringMatcher = function() {var strs = [];return function findMatches(q, cb) {var matches, substrRegex;matches = [];var i = 1;substrRegex = new RegExp(q, 'i');$('.typeahead').bind('input',function(){strs=[];var searchQuery = $(this).val();var searchQueryLength = searchQuery.length;if (searchQueryLength >=3){$.ajax({url: 'https://completion.amazon.com/search/complete',method: 'POST',dataType: 'jsonp',cache: false,data: {client: 'amazon-search-ui',mkt: 1,'search-alias': 'aps',q: searchQuery}}).done(function(response){strs=response[1];tempStrs = strs;}).fail(function(){console.log('error');});}});$.each(strs, function(i, str) {if (substrRegex.test(str)) {matches.push({ value: str });}});cb(matches);};};$('.typeahead').typeahead({hint: true,highlight: true,minLength: 1},{name: 'states',displayKey: 'value',source: substringMatcher()});$('form').ajaxify(function (response) {$(\".loader\").fadeOut(\"slow\");if(response.error === 'error'){$(\"#notification-div\").removeClass(\"alert-hide\");$('ul#fetchedProducts.thumbnails > li').remove();}else {$(\"#notification-div\").addClass(\"alert-hide\");var item;var fetchedProds = response.products;var pList   = $('ul#fetchedProducts.thumbnails');$('ul#fetchedProducts.thumbnails > li').remove();$.each(fetchedProds, function(i){if(fetchedProds[i].asin) {var li = $('<li/>').addClass('col-md-3').attr('id', fetchedProds[i].asin).appendTo(pList);var Odiv = $('<div/>').addClass('thumbnail').appendTo(li);var badgeSpan = $('<span/>').addClass('badge badge-added pull-right hide').text('Added').appendTo(Odiv);var aDiv = $('<div/>').addClass('prod-desc').appendTo(Odiv);var aImg = $('<a/>').addClass('item_link').attr('href', fetchedProds[i].item_link).attr('target', '_blank').appendTo(aDiv);var Img = $('<img/>').addClass('item_image').attr('src', fetchedProds[i].item_image).appendTo(aImg);var Idiv =  $('<div/>').addClass('caption').appendTo(Odiv);var Tp  =  $('<p/>').addClass('text-center item_title').text(fetchedProds[i].item_title).appendTo(Idiv);var pDiv=$('<div/>').addClass('price-div').appendTo(Odiv);var Va  = $('<a/>').addClass('item_link').attr('href', fetchedProds[i].item_link).attr('target', '_blank').appendTo(pDiv);var amazonlogo = $('<img/>').addClass('pull-left').addClass('amazon-logo').attr('src', '../img/amazon-logo.png').appendTo(Va);var priceTag = $('<h4/>').appendTo(pDiv);var Vs  =  $('<span/>').addClass('pull-right label label-success price').text(fetchedProds[i].price).appendTo(priceTag);var Wbtn= $('<button/>').addClass('btn btn-primary btn-addtowishlist pull-right').attr('id', fetchedProds[i].asin).attr('onclick', 'addToWL(this.id)').text('Add to Wish List').appendTo(Odiv);}});}$('#myModal').modal('show');}, function (xhr, error) {$.notify(\"Sorry no matches found...\");})});--></script><div class=\"container\"><div class=\"row col-md-12\"><div class=\"col-md-3\"><fieldset><legend>Add a new product</legend><form role=\"form\" method=\"POST\" action=\"/products/searchproducts\"><div class=\"form-group\"><label class=\"sr-only\" for=\"searchProducts\">Search a wish</label><div class=\"input-group\"><input name=\"name\" class=\"typeahead\" type=\"text\" class=\"form-control input-lg\" id=\"searchPrductBox\" placeholder=\"Search a wish\"></div></div><button type=\"submit\" class=\"btn btn-success btn-lg\">Search</button></form></fieldset><fieldset  style=\"margin-top: 100px\"><legend>Upcoming Birthdays</legend><div id=\"panel1\" class=\"main-box\"><h4></h4></div></fieldset></div><div class=\"col-md-9\"><fieldset><legend>WishList</legend>").exists(ctx.get("wishList"),ctx,{"else":body_2,"block":body_3},null).write("</fieldset></div></div></div><!-- Button trigger modal --><!-- Modal --><!--<div id=\"loader-div\">We're fetching your wishes...</div><div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"large-modal\"><div class=\"modal-content\"><div class=\"modal-header\" style=\"min-height: 68px;\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button><h4 class=\"modal-title pull-left\" id=\"myModalLabel\" style=\"margin-right:15%\">Add to Your WishList</h4><div id=\"notification-div\" class=\"col-md-5 alert alert-danger fade in alert-hide\" style=\"padding:11px\"><button class=\"close\" data-dismiss=\"alert\">×</button><i class=\"fa-fw fa fa-warning\"></i><strong>No Matches</strong> Found. Please check the spelling...</div></div><div class=\"modal-body\"><form class=\"form-inline\" role=\"form\" style=\"margin-left: 23%; margin-bottom: 20px;\" method=\"POST\" action=\"/products/searchproducts\"><div class=\"form-group\"><label class=\"sr-only\" for=\"searchProducts\">Search a wish</label><div class=\"input-group\" style=\"padding-right:10px\"><input name=\"name\" class=\"typeahead\" type=\"text\" class=\"form-control input-lg\" id=\"searchPrductBox\" placeholder=\"Search a wish\" style=\"width:670px\"></div></div><button type=\"submit\" class=\"btn btn-success btn-lg\" style=\"padding: 11px 30px;\">Search</button></form><div class=\"col-md-12\"><ul class=\"thumbnails\" id=\"fetchedProducts\"></ul></div></div><div class=\"modal-footer\"></div></div></div></div>--><!--<div class=\"modal fade\" id=\"deleteConfirmationModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"dialogDeleteConfirm\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">x</button><h4 class=\"modal-title\" id=\"myModalLabel\">Confirm</h4></div><div class=\"modal-body\"><h5>Are you sure want to delete this product?</h5></div><div class=\"modal-footer\"><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-primary\" id=\"confirmProductDelete\" onclick=\"deleteProduct(this.value)\">Yes</button><button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-primary\"  id=\"no\">No</button></div></div></div></div>-->");}function body_2(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("There are no wishes :(");}function body_3(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<ul class=\"thumbnails wishes\">").section(ctx.get("wishList"),ctx,{"block":body_4},null).write("</ul>");}function body_4(chk,ctx){ctx=ctx.shiftBlocks(blocks);return chk.write("<li class=\"col-md-3\" id=\"").reference(ctx.getPath(true,["_id"]),ctx,"h").write("\"><div class=\"main-box\"><!--<button type=\"button\" class=\"deleteProduct close\" data-id=\"").reference(ctx.getPath(true,["_id"]),ctx,"h").write("\" data-toggle=\"modal\" data-target=\"#deleteConfirmationModal\"><span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span></button>--><div class=\"prod-desc\"><a class=\"item_link\" href=\"").reference(ctx.getPath(true,["item_link"]),ctx,"h").write("\" target=\"_blank\"><img class=\"item_image\" src=\"").reference(ctx.getPath(true,["item_image"]),ctx,"h").write("\"></a></div><div class=\"caption\"><p class=\"text-center item_title\">").reference(ctx.getPath(true,["item_title"]),ctx,"h").write("</p></div><div class=\"price-div\"><a class=\"item_link\" href=\"").reference(ctx.getPath(true,["item_link"]),ctx,"h").write("\" target=\"_blank\"><img class=\"pull-left amazon-logo\" src=\"../img/amazon-logo.png\"></a><span class=\"pull-right label label-success price\">").reference(ctx.getPath(false,["pricing","retail"]),ctx,"h").write("</span></div><a class=\"btn btn-primary btn-sm btn-block\" href=\"").reference(ctx.getPath(true,["item_link"]),ctx,"h").write("\" target=\"_blank\" role=\"button\">Gift</a><!--button class=\"btn btn-primary pull-right\" id=\"\" onclick=\"addToWL(this.id)\">Add to Wish List</button--></div></li>");}return body_0;})();