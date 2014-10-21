'use strict';

var wishlist        = require('../../models/wishlistModel');
var wishlistModel   = wishlist.wishlistModel();
var amazon          = require('../../lib/apac').OperationHelper;
var googleHelper    = require('../../lib/googleHelper');
var amazonHelper    = require('../../lib/amazonHelper');
var async           = require('async');

module.exports = function (router) {

    router.post('/addtowishlist', function(req, res)
    {
        var wishList =  new wishlistModel(wishlist.fillWishlistItem(req));

        wishList.save(function(err, result)
        {
            if(err)
            {
                console.log(err);
                res.redirect('/');
            }
            else
            {
                res.send({"response": "Ok"});
            }
        });
    });

    router.post('/searchproducts', function(req, res) {

        console.time('getproducts');
        var searchQuery = req.body.name;
        var amazonConfig = req.app.kraken.get('amazon-config');
        var amazonInit = new amazon (amazonConfig);

        var tasks =
        {
            amazonCaller            : async.apply(amazonHelper.amazonCaller, amazonInit, searchQuery, res),
            googleSuggestedQuery    : async.apply(googleHelper.googleSuggestedQuery, searchQuery),
            amazonCallerResult      : ['amazonCaller', amazonHelper.amazonCallerResult],
            googleAmazonCaller      : ['googleSuggestedQuery', 'amazonCallerResult', async.apply(googleHelper.googleAmazonCaller, amazonInit, res)]
        };

        async.auto(tasks, function onDone(err, result) {

            if (err)
            {
                console.log('error: ' + JSON.stringify(err));
                res.send({error:'error'});
            }

            if(typeof result.amazonCaller == 'undefined' && typeof result.googleAmazonCaller == 'undefined')
            {
                console.timeEnd('getproducts');
                res.send({error:'error'});
            }
        });
    });
};
