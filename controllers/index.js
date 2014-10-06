'use strict';


var IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function(req, res) {
        res.redirect('/login');
    });

    // for get request from web browser
    router.get('/login', function(req, res) {
        if (req.session.fbAccessToken) {
            res.redirect('/mywishlist');
        }
        else {
            // render login page if fbAccessToken is not available in session
            res.render('login', model);
        }

    });

    // for post request from facebook
    router.post('/login', function(req, res) {
        res.render('login', model);
    });

    router.get('/logout', function(req, res) {
        // destroy the session and redirect the user to login page.
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            }
            else
            {
                res.redirect('/login');
            }
        });
    });
};
