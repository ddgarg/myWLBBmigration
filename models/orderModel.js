'use strict';

var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({

    senderId: {
        type:String
    },
    receiverId: {
        type:String
    },
    productId: {
        type: String
    },
    status: {
        type: String,
        enum: ['inprogress', 'completed' ],
        default: 'inprogress'
    },
    timeCreated: {
        type: Date
    }
});

exports.orderModel = function(){
    return mongoose.model('orderInfo', userSchema);
};