'use strict';

var wishFactory = require('../../models/wishModel');
var wishModel = wishFactory.wishModel();

module.exports = function (router){

    router.get('/' , function (req , res){
        if ( req.session.fbAccessToken )
        {
           res.redirect('/');
        }
        else
        {
            res.redirect('/login');
        }
    });

	router.post('/' , function (req , res){
		if ( req.session.fbAccessToken )
		{
			var wish = new wishModel(wishFactory.fillWish(req));
			wish.save(function (err , result){
				if ( err )
				{
					console.log(err);
					/*
					 *  TODO If Wish is not saved, Log it and show meaningful message to the user
					 */
					res.redirect('/');
				}
				else
				{
					res.json(result);
				}
			});
		}
		else
		{
			res.redirect('/login');
		}
	});

	router.delete('/:id' , function (req , res){
		if ( req.session.fbAccessToken )
		{
			wishModel.remove({'userId' : req.session.userId , '_id' : req.param('id')} , function (err){
				if ( err )
				{
					/*
					 *  TODO If not deleted Log it and redirect properly.
					 */
					console.log('error while deleting product: ' + err);
					res.redirect('/');
				}
				else
				{
					/*
					 * TODO Send delete confirmation properly with particular error code
					 */
					res.json({'response' : 'Product Deleted'});
				}
			});
		}
		else
		{
			res.redirect('/login');
		}

	});
};
