'use strict';

var fbgraph   = require('fbgraph');
var commonHelper = require('../lib/commonHelper');
var moment  = require('moment');


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

var getProfilePicture = function(fbUserId){



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
        .get('/me/friends', { fields: 'first_name, name, picture, birthday'}, function(err, fbres) {
            if (err) {
                console.log(err);
                console.log('errorrrrr');
            }
            else {
                // Format Birthday before sending response
                fbres.data.forEach(function(friend){
                   if(friend.birthday)
                   {
                       var fuckingBirthday = friend.birthday.split('/');
                       var monthAndDate = fuckingBirthday[0] + "/" + fuckingBirthday[1];
                       friend.birthday = moment(monthAndDate).format('Do MMM');
                   }
                });
                callback(fbres);
            }
        });
};
var getFilteredFriendsBdays = function(req, callback) {
    var options = {
        timeout:  10000,
        pool:     { maxSockets:  Infinity },
        headers:  { connection:  'keep-alive' }
    };

    fbgraph.setAccessToken(req.session.fbAccessToken);
    fbgraph
        .setOptions(options)
        .get('/me/friends', { fields: 'name, picture, birthday'}, function(err, fbres) {
            if (err) {
                console.log(err);
                console.log('errorrrrr');
            }
            else {

                var fbfilteredBdays = [];
                var bdayArray = fbres.data;

                for (var index = 0; index < bdayArray.length; index++)
                {
                    var currentFriend = bdayArray[index];

                    if (currentFriend.birthday)
                    {
                        var fuckingBirthday = currentFriend.birthday.split('/');
                        var monthAndDate = fuckingBirthday[0] + "/" + fuckingBirthday[1];

                        var dateDiff = moment(monthAndDate).diff(moment().format('MM/DD'), 'days');

                        //var dateDiff = getDifferenceBetweenNowAndBday(fuckingBirthday[1],fuckingBirthday[0]);
                        if ( dateDiff <= 356){

                            currentFriend.birthday = moment(monthAndDate).format('Do MMM');
                            fbfilteredBdays.push(currentFriend);
                        }

                    }
                }
                callback(fbfilteredBdays);
            }
        });
};

var getDifferenceBetweenNowAndBday = function (day, month) {

    var now = new Date();
    var from  = new Date(now.getFullYear(), month - 1 , day - 1);

    var to = new Date(now.getFullYear(), 0, 0);

    var current = now - to;
    var diff = from - to;
    var oneDay = 1000 * 60 * 60 * 24;
    var day1 = Math.floor(diff / oneDay);
    var currentday = Math.floor(current / oneDay);

    return day1 - currentday;

};

module.exports.fbTokenExtender  = fbTokenExtender;
module.exports.createUserFromFb = createUserFromFb;
module.exports.getFriends       = getFriends;
module.exports.getFilteredFriendsBdays = getFilteredFriendsBdays;