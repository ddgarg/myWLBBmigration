'use strict';

var fbHelper = require('../../lib/fbHelper');
var wishlist      = require('../../models/wishlistModel');


module.exports = function (router) {

    var wishlistModel= wishlist.wishlistModel();

    router.get('/', function(req, res){

        if(req.session.fbAccessToken) {
            fbHelper.getFriends(req, function(fbResponse){
               // res.send(fbResponse);
                res.render('friends', fbResponse);
            });
        }
        else
        {
            res.redirect('/login');
        }

    });

    router.get('/:userId', function(req, res) {

        if (req.session.fbAccessToken)
        {
            wishlistModel.find({'userId' : req.params.userId}, function (err, wishes) {
                if (err) {
                    res.redirect('/mywishlist');
                }
                else{
                    var myWishlist = { wishList: wishes };
                    res.render('friendswishlist', myWishlist);
                }
            });
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/');
        }

    });
};