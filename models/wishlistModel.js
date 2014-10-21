'use strict';

var mongoose = require('mongoose');

var wishlistSchema = mongoose.Schema({

    userId: {
        type: String,
        require: true
    },
    kind: {
        type: String,
        default: 'bday'
    },
    asin: {
        type: String,
        require: true
    },
    item_title: {
        type: String
    },
    item_link: {
        type: String
    },
    item_image: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    shipping: {
        weight: {
            type: String
        },
        dimensions: {
            width: {
                type: String
            },
            height: {
                type: String
            },
            depth: {
                type: String
            }
        }
    },
    pricing: {
        list: {
            type: String
        },
        retail: {
            type: String
        },
        savings: {
            type: String
        },
        pct_savings: {
            type: String
        }
    },
    details: {
    },
    status: {
        type: String,
        enum: ['notOrdered', 'inprogress', 'received'],
        default: 'notOrdered'
    },
    buyUrl: {
        type: String
    },

    timeCreated: {
        type: Date,
        default: Date.now
    }
});

var fillWishlistItem = function (req) {
    var wishlistItem = {};
    wishlistItem.userId = req.session.userId;
    wishlistItem.asin = req.body.asin;
    wishlistItem.item_title = req.body.item_title;
    console.log(wishlistItem);
    wishlistItem.item_image = req.body.item_image;
    console.log(wishlistItem);
    wishlistItem.item_link  = req.body.item_link;
    console.log(wishlistItem);
    var pricing = {};
    wishlistItem.pricing = pricing;
    wishlistItem.pricing.retail = req.body.price;
    console.log(wishlistItem);

    return wishlistItem;
};

exports.wishlistModel = function () {
    return mongoose.model('wishlistInfo', wishlistSchema);
};

module.exports.fillWishlistItem = fillWishlistItem;
