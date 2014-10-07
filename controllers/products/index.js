'use strict';


var IndexModel = require('../../models/index');


module.exports = function (router) {

    var model = new IndexModel();

    router.post('/searchproducts', function(req, res) {
        res.send();
    });
};
