'use strict';

var wishlist      = require('../../models/wishlistModel');
var user          = require('../../models/userModel');
var fbHelper      = require('../../lib/fbHelper');


module.exports = function (router) {

    var wishlistModel= wishlist.wishlistModel();
    var userModel   = user.userModel();
    router.get('/', function (req, res) {

        if (req.session.fbAccessToken)
        {
            wishlistModel.find({'userId' : req.session.userId}, function (err, wishes) {
                if (err) {
                    logger.error('mongo err : ' + err);
                    res.redirect('/mywishlist');
                }
                else{
                    var myWishlist = { wishList: wishes };

                    userModel.findOne({'userId': req.session.userId}, function(err, user){
                        if (err) {
                            logger.error('mongo err : ' + err);
                            res.redirect('/login');
                        }
                        else{

                            console.log(user);
                            myWishlist.userDetails = user;
                            fbHelper.getFilteredFriendsBdays(req, function(fbBdayResponse){
                                myWishlist.upcomingbdays  = fbBdayResponse;
                                // res.send(fbResponse);
                                console.log(myWishlist);
                                res.render('mywishlist', myWishlist);

                            });
                        }

                        });




                }
            });
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/');
        }
    });

    router.get('/:userId', function(req, res) {

        if (req.session.fbAccessToken)
        {
            wishlistModel.find({'userId' : req.params.userId}, function (err, wishes) {
                if (err) {
                    logger.error('mongo err : ' + err);
                    res.redirect('/mywishlist');
                }
                else{
                    var myWishlist = { wishList: wishes };

                    userModel.findOne({'userId': req.params.userId}, function(err, user){
                        if (err) {
                            logger.error('mongo err : ' + err);
                            res.redirect('/login');
                        }
                        else{

                            console.log(user);
                            myWishlist.userDetails = user;
                            console.log(myWishlist);
                            res.render('friendwishlist', myWishlist);
                        }

                    });


                }
            });
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/');
        }
    });
};
