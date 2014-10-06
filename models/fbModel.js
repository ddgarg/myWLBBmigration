'use strict';

var mongoose = require('mongoose');

var fbInfoSchema = mongoose.Schema({

    userId: {
        type:Number
    },
    shortAccessToken: {
        type: String
    },
    longAccessToken: {
        type: String
    },
    signedRequest :{
        type: String
    },

    timeCreated: {
        type: Date
    }
});

exports.fbInfoModel = function(){
    return mongoose.model('fbInfo', userSchema);
};