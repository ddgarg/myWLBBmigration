'use strict';

var user      = require('../models/userModel');
var fbHelper    = require('../lib/fbHelper');
var logger  =   require('winston');



module.exports = function (router) {

    var userModel = user.userModel();

    router.get('/', function(req, res) {
        if (req.session.fbAccessToken) {
            res.render('index', {});
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/login');
        }

    });

    router.get('/home', function (req, res) {

        if (req.session.fbAccessToken) {
            res.render('index', {});
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/');
        }
    });


    router.post('/', function(req, res) {
        res.redirect('/login');
    });

    // for get request from web browser
    router.get('/login', function(req, res) {
        if (req.session.fbAccessToken) {
            res.redirect('/');
        }
        else {
            // render login page if fbAccessToken is not available in session
            res.render('login');
        }

    });

    // for post after login
    router.post('/login', function(req, res) {

        var fbConfig = req.app.kraken.get('fb-config');

        fbHelper.fbTokenExtender(req, res,  function(req){

            userModel.findOne({userId: req.body.userId}, function (err, user){
                if(err){
                    console.log('error searching');
                    console.log(err);
                }
                else if(user){
                    console.log('user found');
                    res.redirect('/home');
                }
                else {
                    //createUserFromFb(req, formatFbUser(userObj, saveToDb(formattedUser)));
                    fbHelper.createUserFromFb(req, res, function (formattedUser) {
                        var newUser = new userModel(formattedUser);
                        newUser.save(function (err, newUser) {
                            if(err){
                                console.log(err);
                                res.redirect('/');
                            }
                            else {
                                res.redirect('/home');
                            }
                        });
                    });
                }
            });
        });
    });

    router.get('/logout', function(req, res) {
        // destroy the session and redirect the user to login page.
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            }
            else
            {
                res.redirect('/');
            }
        });
    });
};
