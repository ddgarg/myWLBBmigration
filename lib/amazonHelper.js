'use strict';

var productLinkWithAWSId = 'https://www.amazon.in/dp/{product-asin}/?tag=test-giftnwishcom-21';

var amazonCaller = function (amazonInit, searchQuery, res, callback) {

    var d = new Date();
    amazonInit.execute('ItemSearch', {
            'SearchIndex': 'All',
            'Keywords': searchQuery,
            'ResponseGroup': 'ItemAttributes,Offers,Images'
        }, function (results,  onAmazonError) {


            var amazonRequest = results.ItemSearchResponse.Items[0].Request[0];

            if (amazonRequest.hasOwnProperty('Errors'))
            {
                callback(null);
            }
            else {
                formatAmazonResponse(results, res, callback);
            }
        }
    );
};

var amazonCallerResult = function (callback, result)
{
    var d = new Date();
    callback(null, typeof result.amazonCaller === 'undefined');

};

var formatAmazonResponse = function(amazonRes, res, callback){

    var amazonItems = amazonRes.ItemSearchResponse.Items[0];
    var formattedResponse = [{}];
    var item;
    var image_url;
    for(item = 0 ; item < amazonItems.Item.length; item ++)
    {
        if( validateProductEntries(amazonItems.Item[item]))
        {
            var finalItem = {};
            finalItem.asin     =    amazonItems.Item[item].ASIN[0];

            finalItem.item_link =   productLinkWithAWSId.replace('{product-asin}', finalItem.asin);
            image_url =   amazonItems.Item[item].ImageSets[0].ImageSet[0].MediumImage[0].URL[0];
            finalItem.item_image = image_url.replace('http://ecx.images-amazon.com', 'https://images-na.ssl-images-amazon.com');
            var pricing = {};
            finalItem.pricing = pricing;
            finalItem.pricing.retail = amazonItems.Item[item].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];;

            finalItem.item_title =  amazonItems.Item[item].ItemAttributes[0].Title[0];
            formattedResponse.push(finalItem);
        }

    }
    // First element is not a product, using shift to slice off the same
    formattedResponse.shift();
    res.send(formattedResponse);

    callback(null, formattedResponse);
};

var validateProductEntries = function (amazonItem) {

    if(typeof amazonItem.DetailPageURL === 'undefined')
    {
        return false;
    }
    else if(typeof amazonItem.ImageSets === 'undefined')
    {
        return false;
    }
    else if(typeof amazonItem.ImageSets[0].ImageSet === 'undefined')
    {
        return false;
    }
    else if(typeof amazonItem.ImageSets[0].ImageSet[0].MediumImage === 'undefined')
    {
        return false;
    }
    else if(typeof amazonItem.ImageSets[0].ImageSet[0].MediumImage[0].URL === 'undefined')
    {
        return false;
    }
    else if(typeof amazonItem.OfferSummary === 'undefined')
    {
        return false;
    }
    else if (typeof amazonItem.OfferSummary[0].LowestNewPrice === 'undefined')
    {
        return false;
    }
    else if(typeof amazonItem.OfferSummary[0].LowestNewPrice[0].FormattedPrice === 'undefined')
    {
        return false;
    }
    else if(typeof amazonItem.ItemAttributes ==='undefined')
    {
        return false;
    }
    else
    {
        return (typeof amazonItem.ItemAttributes[0].Title !== 'undefined');
    }

};

module.exports.amazonCaller = amazonCaller;
module.exports.amazonCallerResult = amazonCallerResult;

