'use strict';


var IndexModel  = require('../../models/index');
var amazon      = require('../../lib/apac').OperationHelper;
var util        = require('util');
var request       = require('request');
var cheerio       = require('cheerio');

var amazonProductNotMatchedError = 'AWS.ECommerceService.NoExactMatches';

module.exports = function (router) {

    var model = new IndexModel();

    router.post('/addtowl', function(req, res) {
       console.log(req.body.asin);
        res.send({'response': 'OK'});
    });

    function amazonCaller(amazonHelper, searchQuery, res) {
        amazonHelper.execute('ItemSearch', {
                'SearchIndex': 'All',
                'Keywords': searchQuery,
                'ResponseGroup': 'ItemAttributes,Offers,Images'
            }, function (results, onAmazonError) {
                console.timeEnd("amazon-request");

                amazonResponseHasError(results, searchQuery, googleSuggestedQuery, function (queryStatus) {
                    console.log(queryStatus);
                    if (!queryStatus.callAmazonAgain && queryStatus.suggestedQuery)
                    {
                        formatAmazonResponse(results, function (formattedResponse) {
                            console.log("sendingfromcallback");
                            res.send(formattedResponse);
                        });
                    }
                    else if(queryStatus.suggestedQuery){
                        amazonCaller(amazonHelper, queryStatus.suggestedQuery, res);
                    }
                    else {
                        errorFromAmazon(res, {'error': 'error'});
                    }

                });


            }
        );
    }

    var amazonResponseHasError = function(results, searchQuery, googleSuggestedQuery, callback){
        var amazonRequest = results.ItemSearchResponse.Items[0].Request[0];


        if (amazonRequest.hasOwnProperty("Errors"))
        {
            var amazonError = amazonRequest.Errors[0].Error[0].Code[0];
            if(amazonError === amazonProductNotMatchedError)
            {
             googleSuggestedQuery(searchQuery, callback);
            }
        }
        else {
            callback({'suggestedQuery': searchQuery, 'callAmazonAgain': false});
        }

    };


    var googleSuggestedQuery = function(searchQuery, callback){

        console.time('google-request');

        request('https://www.google.co.in/search?q='+ searchQuery, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var message = $("a.spell").attr('href');

                if(typeof message ==  'undefined')
                {
                    callback({'suggestedQuery': null, 'callAmazonAgain': false});
                }
                else {
                    console.timeEnd('google-request');
                    var suggestedSearchQuery = message.match(/q=(.*?)\&/)[1].replace(/\+/g," ");
                    callback({'suggestedQuery' : suggestedSearchQuery, 'callAmazonAgain': true});
                }
            }
            else
            {
                return {'suggestedQuery': null, 'callAmazonAgain': false};
            }

        });
    };

    router.post('/searchproducts', function(req, res) {
        var searchQuery = req.body.name;
        var amazonConfig = req.app.kraken.get('amazon-config');
        var amazonHelper = new amazon (amazonConfig);

        console.log('searchQuery' + searchQuery);
        console.time("amazon-request");
        amazonCaller(amazonHelper, searchQuery, res);
    });

    var errorFromAmazon = function (res, error){

        res.send({"error" :error});
    };

    var formatAmazonResponse = function(amazonRes, callback){

        var amazonItems = amazonRes.ItemSearchResponse.Items[0];
        var formattedResponse = [{}];
        var item;
        for(item = 0 ; item < amazonItems.Item.length; item ++)
        {
            var finalItem = {};
            finalItem.asin     =    amazonItems.Item[item].ASIN[0];
            finalItem.item_link =   amazonItems.Item[item].DetailPageURL[0];
            finalItem.item_image=   amazonItems.Item[item].ImageSets[0].ImageSet[0].MediumImage[0].URL[0];
            if (amazonItems.Item[item].OfferSummary && amazonItems.Item[item].OfferSummary[0].LowestNewPrice)
            {
                finalItem.price =       amazonItems.Item[item].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
            }
            finalItem.item_title =  amazonItems.Item[item].ItemAttributes[0].Title[0];
            formattedResponse.push(finalItem);
        }
        var productArray = {'products': formattedResponse};
//        console.log(productArray);
        callback(productArray);
    };
};
