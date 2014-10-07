'use strict';


var user      = require('../../models/userModel');
var IndexModel = require('../../models/index');
var userModel = user.userModel();
var fbgraph   = require('fbgraph');


module.exports = function (router) {

   var model = new IndexModel();


    router.get('/', function (req, res) {

        if (req.session.fbAccessToken)
        {
            res.render('mywishlist', model);
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/login');
        }
    });

    router.post('/', function (req, res) {

        var fbConfig = req.app.kraken.get('fb-config');

        // extending short lived access token to long lived one
        fbgraph.extendAccessToken({
            "access_token":    req.body.accessToken
            , "client_id":      fbConfig.client_id
            , "client_secret":  fbConfig.client_secret
        }, function (err, facebookRes) {
            if (err){
                console.log(err);
                res.redirect('/login');
            }
            else {
                // initialize the session, after logging this would be the single entry point where all the request would come.
                storeInfoInSession(req, facebookRes);

                console.log(req.body.userId);

                userModel.findOne({userId: req.body.userId}, function (err, user){
                   if(err){
                       console.log('error searching');
                       console.log(err);
                   }
                   else if(user){
                       console.log('user found');
                       res.render('mywishlist', model);
                   }
                   else {
                       //createUserFromFb(req, formatFbUser(userObj, saveToDb(formattedUser)));
                        console.log('new user');
                       createUserFromFb(req, res, formatFbUser);
                   }
                });
            }
        });

    });

    router.post('/addproduct', function (req, res) {
       console.log(req.body);
       res.render('mywishlist', model);
    });

    //helper functions
    var storeInfoInSession = function (req, facebookRes) {
        req.session.fbAccessToken = facebookRes.access_token;
        req.session.userId = req.body.userId;
        req.session.signedRequest = req.body.signedRequest;
        console.log(facebookRes);
    };

    var createUserFromFb = function(req, res, callback) {
        var options = {
            timeout:  3000
            , pool:     { maxSockets:  Infinity }
            , headers:  { connection:  "keep-alive" }
        };

        fbgraph.setAccessToken(req.session.fbAccessToken);
        fbgraph
            .setOptions(options)
            .get("/me", function(err, fbres) {
                if (err) {
                    console.log(err);

                }
                else {
                    callback(res, fbres, saveUserToDb);
                }
            });
    };

    var formatFbUser = function(res, fbUser, callback){
        var formattedUser = {};
        formattedUser.userId    = fbUser.id;
        formattedUser.firstName = fbUser.first_name;
        formattedUser.lastName  = fbUser.last_name;
        formattedUser.email     = fbUser.email;
        formattedUser.birthday  = fbUser.birthday;
        formattedUser.gender    = fbUser.gender;
        formattedUser.fblink    = fbUser.link;
        formattedUser.timeCreated= new Date();

        callback(res, formattedUser);
    };

    var saveUserToDb = function (res, formattedUser) {
      var newUser = new userModel(formattedUser);
        newUser.save(function (err, newUser) {
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else {
                res.render('mywishlist', model);
            }
        });
    };
};
