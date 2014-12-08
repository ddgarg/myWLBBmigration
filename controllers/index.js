'use strict';

var userObject = require('../models/userModel');
var fbHelper = require('../lib/fbHelper');

module.exports = function (router){

	var userModel = userObject.userModel();

	router.get('/' , function (req , res){
		if ( req.session.fbAccessToken )
		{
			res.render('landingAfterLogin' , {});
		}
		else
		{
			res.redirect('/login');
		}
	});

	// for post request from facebook
	router.post('/' , function (req , res){
		res.redirect('/login');
	});

	// for get request from web browser
	router.get('/login' , function (req , res){
		if ( req.session.fbAccessToken )
		{
			res.redirect('/');
		}
		else
		{
			res.render('login');
		}
	});

	// for post after login
	router.post('/login' , function (req , res){

		var fbConfig = req.app.kraken.get('fb-config');
		fbHelper.fbTokenExtender(req , res , function (req){
			userModel.findOne({userId : req.body.userId} , function (err , user){
				if ( err )
				{
					console.log(err);
					/*
					 * Redirect properly if DB doesn't give the user.
					 */
					res.redirect('/');
				}
				else if ( user )
				{
					console.log('user found');
					res.redirect('/');
				}
				else
				{
					fbHelper.createUserFromFb(req , res , function (formattedUser){

						var newUser = new userModel(userObject.fillUser(formattedUser));
						newUser.save(function (err , newUser){
							if ( err )
							{
								console.log(err);
								/*
								 * Redirect properly if not able to save the user.
								 */
								res.redirect('/');
							}
							else
							{
								res.redirect('/');
							}
						});
					});
				}
			});
		});
	});

	router.get('/logout' , function (req , res){
		// destroy the session and redirect the user to login page.
		req.session.destroy(function (err){
			if ( err )
			{
				/*
				 * TODO If not able to destroy show Internal Server Error
				 */
				console.log(err);
				res.redirect('/');
			}
			else
			{
				res.redirect('/');
			}
		});
	});
};