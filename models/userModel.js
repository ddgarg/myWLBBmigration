'use strict';

var mongoose = require('mongoose');
var moment  = require('moment');

var userSchema = mongoose.Schema({

    userId: {
        type:String,
        required: true,
        unique: true
    },
    profilePhoto: {
        type:String,
        default:'../img/default-user.jpg'
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ''
    },
    email : {
        type: String,
        default: ''
    },
    birthday: {
        type:String,
        default:''
    },
    gender: {
        type:String,
        default:''
    },
    fblink: {
        type:String,
        default:''
    },
    deliveryAddress :
         [
            {
                name: {
                    type: String,
                    default:''
                },
                kind: {
                    type:String
                },
                address1: {
                    type: String
                },
                address2: {
                    type: String
                },
                city: {
                    type: String
                },
                state: {
                    type: String
                },
                country: {
                    type: String
                },
                pincode: {
                    type: String
                }
            }
        ],
//    deliveryAddress : {
//        type:Array,
//        default: [
//            {
//                name: {
//                    type: String,
//                    default:''
//                },
//                kind: {
//                    type:String
//                },
//                address1: {
//                    type: String
//                },
//                address2: {
//                    type: String
//                },
//                city: {
//                    type: String
//                },
//                state: {
//                    type: String
//                },
//                country: {
//                    type: String
//                },
//                pincode: {
//                    type: String
//                }
//            }
//        ]
//    },
    phoneNo : {
        type: Number
    },

    timeCreated: {
        type: Date,
        default: Date.now
    },

    lastModified: {
        type: Date,
        default: Date.now
    }
});

var fillUser = function (req) {
    var user = {};
    user.userId     = req.userId;
    user.firstName  = req.firstName;
    user.lastName   = req.lastName;
    user.emailId    = req.emailId;
    user.fblink     = req.fblink;
    user.gender     = req.gender;
    user.email    = req.email;
    user.birthday   = moment(req.birthday).format('Do MMM');
    user.deliveryAddress = [];
    user.deliveryAddress.push(req.deliveryAddress | {}) ;
    user.phoneNo    = req.phoneNo;
    user.timeCreated= new Date();

return user;
};

exports.userModel = function(){
    return mongoose.model('userInfo', userSchema);
};

module.exports.fillUser = fillUser;