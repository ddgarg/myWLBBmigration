'use strict';


var IndexModel  = require('../../models/index');
var amazon      = require('apac').OperationHelper;
var util        = require('util');

module.exports = function (router) {

    var model = new IndexModel();

    router.post('/addtowl', function(req, res) {
       console.log(req.body.asin);
        res.send({'response': 'OK'});
    });

    router.post('/searchproducts', function(req, res) {
        var searchQuery = req.body.name;
        var amazonConfig = req.app.kraken.get('amazon-config');
        var amazonHelper = new amazon (amazonConfig);
        console.log('searchQuery' + searchQuery);
        amazonHelper.execute('ItemSearch', {
                'SearchIndex': 'All',
                'Keywords': searchQuery,
                'ResponseGroup': 'ItemAttributes,Offers,Images'
            }, function(results, onAmazonError) { // you can add a third parameter for the raw xml response, 'results' here are currently parsed using xml2js
                    formatAmazonResponse(results, function(formattedResponse) {
                        res.send(formattedResponse);
                    });
            }
        );

    });

    var onAmazonError = function (error){
        console.log('error in Amazon call');
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
            if (amazonItems.Item[item].OfferSummary)
            {
                finalItem.price =       amazonItems.Item[item].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
            }
            finalItem.item_title =  amazonItems.Item[item].ItemAttributes[0].Title[0];
            formattedResponse.push(finalItem);
        }
        var productArray = {'products': formattedResponse};
        console.log(productArray);
        callback(productArray);
    };
};
