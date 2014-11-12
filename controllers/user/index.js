'use strict';

var fbHelper = require('../../lib/fbHelper');
var wishlist      = require('../../models/wishlistModel');
var user      = require('../../models/userModel');


module.exports = function (router) {

    var wishlistModel= wishlist.wishlistModel();
    var userModel   =   user.userModel();

    router.get('/friends', function(req, res){

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

    router.get('/wishlist/:userId', function(req, res) {

        if (req.session.fbAccessToken)
        {
            wishlistModel.find({'userId' : req.params.userId}, function (err, wishes) {
                if (err) {
                    logger.error('mongo err : ' + err);
                    res.redirect('/mywishlist');
                }
                else{
                    var myWishlist = { wishList: wishes };
                    res.render('friendwishlist', myWishlist);
                }
            });
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/');
        }

    });

    router.get('/address', function(req, res) {

        if (req.session.fbAccessToken)
        {
            var address = req.body;

            userModel.findOne({'userId' : String(req.session.userId)}, function (err, user) {

                    if(err){
                        console.log(err);
                        res.send({"response":"NotOk"});
                    }
                    else{
                        console.log(req.body);
                        console.log("address received");
                        res.send(user.postalAddress);
                    }
                });
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/');
        }
    });

    router.post('/address', function(req, res) {

        if (req.session.fbAccessToken)
        {
            var address = req.body;

            userModel.update({'userId' : String(req.session.userId)},
                {
                    $set: {
                        "postalAddress": address
                    },
                    $currentDate: { lastModified: true }
                },
                {
                    upsert : true
                },
                function (err) {
                    if(err){
                        console.log(err);
                        res.send({"response":"NotOk"});
                    }
                    else{
                        console.log(req.body);
                        console.log("address received");
                        res.send({"response":"Ok"});
                    }
                });
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/');
        }
    });

    router.delete('/address', function(req, res){

        if (req.session.fbAccessToken)
        {
            userModel.update({'userId' : String(req.session.userId)},
                {
                    $set: {
                        "postalAddress": {}
                    },
                    $currentDate: { lastModified: true }
                },
                {
                    upsert : true
                },
                function (err) {
                    if(err){
                        console.log(err);
                        res.send({"response":"NotOk"});
                    }
                    else{
                        console.log("address deleted");
                        res.send({"response":"Ok"});
                    }
                });
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/');
        }
    });
};