'use strict';



var wishlist      = require('../../models/wishlistModel');


module.exports = function (router) {

    var wishlistModel= wishlist.wishlistModel();
    router.get('/', function (req, res) {

        if (req.session.fbAccessToken)
        {
            wishlistModel.find({'userId' : req.session.userId}, function (err, wishes) {
                if (err) {
                    logger.error('mongo err : ' + err);
                    res.redirect('/mywishlist');
                }
                else{
                    var myWishlist = { wishList: wishes };
                    res.render('mywishlist', myWishlist);
                }
            });
        }
        else {
            // redirect the user to login page if fbAccessToken is not available in session
            res.redirect('/');
        }
    });
};
