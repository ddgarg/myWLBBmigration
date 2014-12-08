'use strict';

var fbHelper = require('../../lib/fbHelper');
var wishFactory = require('../../models/wishModel');
var userFactory = require('../../models/userModel');

module.exports = function (router){

	var wishModel = wishFactory.wishModel();
	var userModel = userFactory.userModel();

    router.get('/details/:id?' , function (req , res){

        if ( req.session.fbAccessToken )
        {
            userModel.findOne({'userId' : req.session.userId} , function (err , user){
                if ( err )
                {
                    /*
                     * TODO  Not able to find user details show Internal Server Error
                     */
                    res.redirect('/login');
                }
                else
                {
                    res.json(user);
                }
            });
        }
        else
        {
            res.redirect('/login');
        }

    });

    router.get('/wishlist', function (req, res) {

        if (req.session.fbAccessToken) {
            wishModel.find({'userId': req.session.userId}, function (err, wishes) {
                if (err) {

                    res.redirect('/mywishlist');
                }
                else {
                    res.json(wishes);
                }
            });
        }
        else {
            res.redirect('/');
        }
    });

    router.get('/address/:id?' , function (req , res){

        if ( req.session.fbAccessToken )
        {
            userModel.findOne({'userId' : req.session.userId} , {deliveryAddress : 1} , function (err , result){
                if ( err )
                {
                    /*
                     *
                     *  TODO If DB gives error for address; At least show other stuffs
                     *
                     *
                     */
                    res.redirect('/');
                }
                else
                {
                    var address = result.deliveryAddress[1] || {'addressstatus' : 'absent'};
                    res.json(address);
                }
            });
        }
        else
        {
            res.redirect('/login');
        }

    });

    router.post('/address' , function (req , res){

        if ( req.session.fbAccessToken )
        {
            var address = req.body;
            var response;

            userModel.findOne({'userId' : req.session.userId} , function (err , user){
                user.deliveryAddress.push(address);
                user.save(function (err , result){
                    console.log(err);
                    res.json(result.deliveryAddress[1]);
                })
            });
        }
        else
        {
            res.redirect('/');
        }
    });

    router.put('/address/:id' , function (req , res){

        if ( req.session.fbAccessToken )
        {
            var addressID = req.param('id');
            var updatedAddress = req.body;
            userModel.update(
                {
                    userId          : req.session.userId ,
                    deliveryAddress : {$elemMatch : {'_id' : addressID}}
                } ,
                {
                    $set : {
                        "deliveryAddress.$" : updatedAddress
                    }
                } , function (err , response){
                    res.send({"response" : "ok"});
                });
        }
        else
        {
            res.redirect('/');
        }
    });

    router.delete('/address/:id' , function (req , res){

        if ( req.session.fbAccessToken )
        {
            var addressID = req.param('id');
            userModel.update(
                {
                    userId : req.session.userId
                } ,
                { $pull : { deliveryAddress : {'_id' : addressID} } } , function (err , response){
                    res.send({"response" : "ok"});
                });
        }
        else
        {
            res.redirect('/');
        }
    });

	router.get('/friends' , function (req , res){

		if ( req.session.fbAccessToken )
		{
			/*
			 * TODO Do Exception Handling in fbHelper and send an error code
			 */
			fbHelper.getFriends(req , function (fbResponse){
				res.json(fbResponse);
			});
		}
		else
		{
			res.redirect('/login');
		}

	});

	router.get('/getFriendsSuggestions' , function (req , res){

		if ( req.session.fbAccessToken )
		{
			fbHelper.getFriends(req , function (fbResponse){
                var fbFriendsFormattedArray = [];
				var fbFriends = fbResponse.data;
				for ( var friend = 0 ; friend < fbFriends.length ; friend++ )
				{
					var friendObj = {};
					friendObj.id = fbFriends[friend].id;
					friendObj.name = fbFriends[friend].name;
					friendObj.picture = fbFriends[friend].picture.data.url;

                    fbFriendsFormattedArray.push(friendObj);
				}
				res.json(fbFriendsFormattedArray);
			});
		}
		else
		{
			res.redirect('/login');
		}
	});

	/*
	 *
	 *
	 * TODO Check for friendship; If not, show Not Found!!!
	 *
	 *
	 */

	router.get('/friend/details/:userId' , function (req , res){

		if ( req.session.fbAccessToken )
		{
			userModel.findOne({'userId' : req.params.userId} , function (err , user){
				if ( err )
				{
					res.redirect('/');
				}
				else
				{
					res.json(user);
				}
			});
		}
		else
		{
			res.redirect('/login');
		}

	});

	/*
	 *
	 *
	 * TODO Check for friendship; If not, show Not Found!!!
	 *
	 *
	 */
	/*
	 *
	 *  TODO Do NOT send mongo Id for friend's address; User doesn't need this!!!
	 *
	 */

	router.get('/friend/address/:userId' , function (req , res){

		if ( req.session.fbAccessToken )
		{
			userModel.findOne({'userId' : req.params.userId} , {deliveryAddress : 1} , function (err , result){
				if ( err )
				{
					/*
					 *
					 *  TODO If DB gives error for address; At least show other stuffs
					 *
					 *
					 */
					res.redirect('/');
				}
				else
				{
					var address = result.deliveryAddress[1] || {'addressstatus' : 'absent'};
					res.json(address);
				}
			});
		}
		else
		{
			res.redirect('/login');
		}

	});

	/*
	 *
	 *
	 * TODO Check for friendship; If not, show Not Found!!!
	 *
	 *
	 */

	router.get('/friends/birthday' , function (req , res){

		if ( req.session.fbAccessToken )
		{
			/*
			 * TODO Do Exception Handling in fbHelper and send an error code
			 */
			fbHelper.getFilteredFriendsBdays(req , function (fbBdayResponse){
				res.json(fbBdayResponse);
			});
		}
		else
		{
			res.redirect('/login');
		}

	});

	/*
	 *
	 *
	 * TODO Check for friendship; If not, show Not Found!!!
	 *
	 *
	 */

	router.get('/wishlist/:userId' , function (req , res){

		if ( req.session.fbAccessToken )
		{
			wishModel.find({'userId' : req.params.userId} , function (err , wishes){
				if ( err )
				{
					/*
					 *
					 *  TODO If DB gives error for wishlist; At least show meaningful message
					 *
					 *
					 */
					res.redirect('/');
				}
				else
				{
					res.json(wishes);
				}
			});
		}
		else
		{
			res.redirect('/');
		}

	});
};