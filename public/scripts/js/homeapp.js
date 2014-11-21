'use strict';

require(["../common"], function (common) {

    require(["jquery","bootstrapjs","fbjs","dustcorejs","templates/layouts/master","templates/components/upcomingbirthday","templates/components/navbar", "templates/components/addressmodal","templates/awishlist"], function(){



        var app = {
            initialize: function () {
                // Your code here


                $(document).ready(function () {
                    $(".loader").fadeOut("slow");

                    $.ajax({
                        url: '/mywishlist/mywl',
                        type: 'get',
                        success: function (data) {console.log(data);
                            dust.render("awishlist", data, function(err, out) {
                                console.log(err);
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
