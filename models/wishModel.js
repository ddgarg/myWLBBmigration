'use strict';

var mongoose = require('mongoose');

var wishSchema = mongoose.Schema({

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

var fillWish = function (req) {
    var wish = {};
    wish.userId = req.session.userId;
    wish.asin = req.body.asin;
    wish.item_title = req.body.item_title;
    wish.item_image = req.body.item_image;
    wish.item_link  = req.body.item_link;
    var pricing = {};
    wish.pricing = pricing;
    wish.pricing.retail = req.body.pricing.retail;
    return wish;
};

exports.wishModel = function () {
    return mongoose.model('wishlistInfo', wishSchema);
};

module.exports.fillWish = fillWish;