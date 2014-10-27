'use strict';

var fbgraph   = require('fbgraph');
var commonHelper = require('../lib/commonHelper');


var fbTokenExtender = function (req, res, callback) {

    var fbConfig = req.app.kraken.get('fb-config');

    fbgraph.extendAccessToken({
        'access_token':    req.body.accessToken,
        'client_id':      fbConfig.client_id,
        'client_secret':  fbConfig.client_secret
    }, function (err, facebookRes) {
        if (err){
            console.log(err);
            res.redirect('/login');
        }
        else {
            // initialize the session, after logging this would be the single entry point where all the request would come.
            commonHelper.storeInfoInSession(req, facebookRes, callback);
        }
    });
};

var createUserFromFb = function(req, res, callback) {
    var options = {
        timeout:  3000,
        pool:     { maxSockets:  Infinity },
        headers:  { connection:  'keep-alive' }
    };

    fbgraph.setAccessToken(req.session.fbAccessToken);
    fbgraph
        .setOptions(options)
        .get('/me', function(err, fbres) {
            if (err) {
                console.log(err);
            }
            else {
                formatFbUser(res, fbres, callback);
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

    callback(formattedUser);
};

var getFriends = function(req, callback) {
    var options = {
        timeout:  10000,
        pool:     { maxSockets:  Infinity },
        headers:  { connection:  'keep-alive' }
    };

    fbgraph.setAccessToken(req.session.fbAccessToken);
    fbgraph
        .setOptions(options)
        .get('/me/friends', { fields: "first_name, name, picture, birthday"}, function(err, fbres) {
            if (err) {
                console.log(err);
                console.log('errorrrrr');
            }
            else {
                console.log(fbres);
                callback(fbres);
            }
        });
};

module.exports.fbTokenExtender  = fbTokenExtender;
module.exports.createUserFromFb = createUserFromFb;
module.exports.getFriends       = getFriends;