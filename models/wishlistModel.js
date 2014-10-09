'use strict';

var mongoose = require('mongoose');

var wishlistSchema = mongoose.Schema({

    userId: {
        type:Number
    },
    kind: {
        type: String,
        default: 'bday'
    },
    items: [
        {
            name: {
                type:String
            },
            viewUrl: {
                type:String
            },
            pictureUrl: {
                type:String
            },
            category:  {
                type:String
            },
            title:  {
                type:String
            },
            description: {
                type:String
            },
            asin:  {
                type:String
            },
            shipping: {
                weight:{
                    type:String
                },
                dimensions: {
                    width: {
                        type:String
                    },
                    height: {
                        type:String
                    },
                    depth: {
                        type:String
                    }
                }
            },
            pricing: {
                list: {
                    type:String
                },
                retail: {
                    type:String
                },
                savings: {
                    type:String
                },
                pct_savings:{
                    type:String
                }
            },
            details: {
            },
            status: {
                type:String,
                enum: ['notOrdered', 'inprogress', 'received'],
                default:'notOrdered'
            },
            buyUrl: {
                type:String
            }
        }
    ],
    timeCreated: {
        type: Date,
        default: Date.now
    }
});

exports.wishlistModel = function(){
    return mongoose.model('wishlistInfo', wishlistSchema);
};