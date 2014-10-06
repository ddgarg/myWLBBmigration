'use strict';


var IndexModel = require('../../models/index');
var fbgraph = require('fbgraph');


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
                req.session.fbAccessToken = facebookRes.access_token;
                req.session.userId = req.body.userId;
                req.session.signedRequest = req.body.signedRequest;

                res.render('mywishlist', model);
            }
        });

    });

};
