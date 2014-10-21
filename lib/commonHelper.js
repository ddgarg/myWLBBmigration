'use strict';



var storeInfoInSession = function (req, facebookRes, callback) {
    req.session.fbAccessToken = facebookRes.access_token;
    req.session.userId = req.body.userId;
    req.session.signedRequest = req.body.signedRequest;
    callback(req);
};

module.exports.storeInfoInSession = storeInfoInSession;