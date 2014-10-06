'use strict';


var IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();

    // for get request from web browser
    router.get('/login', function(req, res) {
        res.render('login', model);
    });

    // for post request from facebook
    router.post('/login', function(req, res) {
        res.render('login', model);
    });
};
