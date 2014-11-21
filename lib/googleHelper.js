'use strict';

var request         = require('request');
var cheerio         = require('cheerio');
var amazonHelper    = require('./amazonHelper');

var googleSuggestedQuery = function(searchQuery, callback){
    var d = new Date();
    console.log('googleSuggestedQueryStartTime');
    console.log(d.getTime());

    console.time('google-request');

    request('https://www.google.co.in/search?q='+ searchQuery, function (error, response, html) {
        if (!error && response.statusCode === 200) {
            var $ = cheerio.load(html);
            var showingMessage   = $('a.spell').attr('href');

            if(typeof showingMessage ===  'undefined')
            {
                console.timeEnd('google-request');
                callback(null);
            }
            else {
                console.timeEnd('google-request');
                var suggestedSearchQuery = showingMessage.match(/q=(.*?)\&/)[1].replace(/\+/g,' ');
                callback(null, suggestedSearchQuery);
            }
        }
    });
};

var googleAmazonCaller = function (amazonInit, res, callback, results) {

    var d = new Date();
    console.log('googleAmazonCallerStartTime');
    console.log(d.getTime());
    console.time('googleAmazonCaller');

    if(typeof results.googleSuggestedQuery === 'undefined' || !results.amazonCallerResult)
    {
        console.timeEnd('googleAmazonCaller');
        callback(null);
    }
    else
    {
        amazonHelper.amazonCaller(amazonInit, results.googleSuggestedQuery, res, callback);
    }
};

module.exports.googleAmazonCaller   = googleAmazonCaller;
module.exports.googleSuggestedQuery = googleSuggestedQuery;
