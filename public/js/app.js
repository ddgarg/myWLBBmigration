'use strict';

require(["./common"], function (common) {

	require(["jquery"], function(){

		var app = {
			initialize: function () {
				// Your code here


				$(document).ready(function () {
					$(window).load(function() {$(".loader").fadeOut("slow");});

					$.ajax({
						       url: '/mywishlist/mywl',
						       type: 'get',
						       success: function (data) {console.log(data);
							       dust.render("awishlist", data, function(err, out) {

								       $("#wishlistdiv").html(out);
							       });
						       }
					       });


				});
			}
		};

		app.initialize();
	});

});

//require(["upcomingbirthday", "awishlist"], function()
//{
//
//});