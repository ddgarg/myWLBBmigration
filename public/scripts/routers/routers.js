define(["jquery","underscore","backbone","models/WishList","views/WishListView","models/User","views/UserView","views/BdayListView","models/BdayList","dustcore"], function($, _, Backbone, WishList,WishListView,User, UserView,BdayListView, BdayList, dust){

    var AppRouter = Backbone.Router.extend({

        routes: {
            ""         : "home",
            "about"    : "about",
            "wishlist" : "home"
        },

        initialize: function () {
            console.log('app router initialized');
        },
        index: function () {
            console.log('index router initialized');
        },
        home: function () {

            var wishListCollection        = new WishList();
            var wishListView    = new WishListView({collection: wishListCollection});
//            wishListCollection.fetch({'reset' : true, success: function(){
////                console.log(wishListCollection);
//                $("#wishlistdiv").html(wishListView.el);
//                var userdata = {};
//                console.log(wishListCollection.length);
//                userdata.userDetails = wishListCollection.userDetails;
//                userdata.upcomingbdays = wishListCollection.upcomingbdays;
//
//                dust.render("userdetailshome", userdata, function(err, out){
//
//                    $(".userdetails").html(out);
//                    dust.render("upcomingbirthday", userdata, function(err, out){
//                        console.log("rendering userdetailshome");
//                        console.log(err);
//                        $(".userdetails").append(out);
//                    })
//
//                });
//
//            }});
            wishListCollection.fetch({'success': function(){

                $("#wishlistdiv").html(wishListView.el);

            }});

            var user = new User();
            var userView = new UserView({model:user});
            user.fetch({"success": function(){

                $("#userdetails").html(userView.el);

            }
            });

            var bdayListCollection        = new BdayList();
            var bdayListView    = new BdayListView({collection: bdayListCollection});

            bdayListCollection.fetch({'reset':true,'success': function(){
                console.log(bdayListCollection);
                $("#upcomingbdaysdiv").html(bdayListView.el);

            }});


            console.log('home called');
        },

        about: function () {
            console.log('about called');
        }
    });
    return AppRouter;
});


