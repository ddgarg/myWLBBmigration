'use strict';

var wishlist = require('../../models/wishlistModel');
var user = require('../../models/userModel');
var fbHelper = require('../../lib/fbHelper');

module.exports = function (router) {

    var wishlistModel = wishlist.wishlistModel();
    var userModel = user.userModel();

    router.get('/', function (req, res) {

        if (req.session.fbAccessToken) {
//            wishlistModel.find({'userId': req.session.userId}, function (err, wishes) {
//                if (err) {
//                    logger.error('mongo err : ' + err);
//                    res.redirect('/mywishlist');
//                }
//                else {
//                    var myWishlist = { wishList: wishes };
//
//                    userModel.findOne({'userId': req.session.userId}, function (err, user) {
//                        if (err) {
//                            logger.error('mongo err : ' + err);
//                            res.redirect('/login');
//                        }
//                        else {
//
//                            myWishlist.userDetails = user;
//                            fbHelper.getFilteredFriendsBdays(req, function (fbBdayResponse) {
//                                myWishlist.upcomingbdays = fbBdayResponse;
//                                res.render('mywishlist', myWishlist);
//
//                            });
//                        }
//
//                    });
//                }
//            });

            res.render('index', {});

        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/');
        }
    });

    router.get('/wishlist', function (req, res) {

        if (req.session.fbAccessToken) {
            wishlistModel.find({'userId': req.session.userId}, function (err, wishes) {
                if (err) {

                    res.redirect('/mywishlist');
                }
                else {
                    res.json(wishes);
                }
            });
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/');
        }
    });

    router.get('/mywl', function (req, res) {

        if (req.session.fbAccessToken) {
            wishlistModel.find({'userId': req.session.userId}, function (err, wishes) {
                if (err) {

                    res.redirect('/mywishlist');
                }
                else {
                    res.json(wishes);
//                    userModel.findOne({'userId': req.session.userId}, function (err, user) {
//                        if (err) {
//
//                            res.redirect('/login');
//                        }
//                        else {
//
//                            var wishList = {};
//                            wishList.wishes = wishes;
//                            wishList.userDetails = user;
//
//                            fbHelper.getFilteredFriendsBdays(req, function (fbBdayResponse) {
//                                wishList.upcomingbdays = fbBdayResponse;
//                                console.log(wishes.upcomingbdays);
//                                res.json(wishList);
//
//                            });
//                        }
//
//                    });
                }
            });
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/');
        }
    });

    router.get('/:userId', function (req, res) {

        if (req.session.fbAccessToken) {
            wishlistModel.find({'userId': req.params.userId}, function (err, wishes) {
                if (err) {
                    res.redirect('/mywishlist');
                }
                else {
                    var myWishlist = { wishList: wishes };

                    userModel.findOne({'userId': req.params.userId}, function (err, user) {
                        if (err) {

                            res.redirect('/login');
                        }
                        else {
                            myWishlist.userDetails = user;
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
