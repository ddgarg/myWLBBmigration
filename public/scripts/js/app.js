'use strict';

require(["../common"], function (common) {

    require(["jquery","fbjs","dustcorejs","backbone","bootstrapjs","templates/layouts/master","templates/components/upcomingbirthday","templates/components/navbar", "templates/components/addressmodal","templates/awishlist"], function(){

        var myWLApp = {};
        myWLApp.Wish = Backbone.Model.extend({

            urlRoot: "/wishlist",

            idAttribute: "asin",

            initialize: function () {

            },

            defaults: {
                asin: null,
                item_image: "",
                item_link: "",
                item_title: "",
                price: ""
            }
        });

        myWLApp.WishList = Backbone.Collection.extend({

            model: myWLApp.Wish,

            url: "/mywishlist/mywl"

        });

       myWLApp.AppRouter = Backbone.Router.extend({

            routes: {
                ""         : "index",
                "about"    : "about",
                "home"     : "home"
            },

            initialize: function () {
                console.log('app router initialized');
            },

            index: function () {

                console.log('index called');
            },

            home: function () {
                var wishList = new myWLApp.WishList();
                wishList.fetch({success: function(){

                    var data =  wishList.models[0].attributes;
                    dust.render("awishlist", data, function(err, out) {
                        console.log(err);
                        console.log(data);
                        $("#wishlistdiv").html(out);
                    });
                }});
                console.log('home called');
            },

            about: function () {
                console.log('about called');
            }
        });


       var app = {
            initialize: function () {
                // Your code here


                $(document).ready(function () {
                    $(".loader").fadeOut("slow");
                    var myapp = new myWLApp.AppRouter();
                    Backbone.history.start();
                });
            }
       };

        app.initialize();
    });

});
