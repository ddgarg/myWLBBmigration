'use strict';

var wishFactory     = require('../../models/wishModel');
var amazon          = require('../../lib/apac').OperationHelper;
var googleHelper    = require('../../lib/googleHelper');
var amazonHelper    = require('../../lib/amazonHelper');
var async           = require('async');

module.exports = function (router) {

    router.get('/search', function(req, res) {

        var searchQuery = req.param('query');
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
                // TODO If we get an error show meaningful error message by sending some error code
                console.log('error: ' + JSON.stringify(err));
                res.json({error:'error'});
            }

            if(typeof result.amazonCaller === 'undefined' && typeof result.googleAmazonCaller === 'undefined')
            {
                // TODO If we get an error show meaningful error message by sending some error code
                res.json({error:'error'});
            }
        });
    });
};
