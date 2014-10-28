'use strict';

var fbgraph     = require('fbgraph');
var fbHelper = require('../../lib/fbHelper');
var IndexModel = require('../../models/index');


module.exports = function (router) {

    var model = new IndexModel();


    router.get('/', function (req, res) {

        if(req.session.fbAccessToken) {


            var options = {
                timeout:  3000,
                pool:     { maxSockets:  Infinity },
                headers:  { connection:  'keep-alive' }
            };

            fbgraph.setAccessToken(req.session.fbAccessToken);
            fbgraph
                .setOptions(options)
                .get('/me/invitable_friends',{fields: 'first_name'}, function(err, fbres) {
                    if (err) {
                        console.log(err);
                        res.redirect('/login');
                    }
                    else {
                        console.log(fbres);
                        res.render('mywishlist', model);
                    }
                });
        }
        else {
            res.redirect('/login');
        }


    });

    router.post('/', function (req, res) {
        res.render('index', model);

    });

    router.get('/getfriendsSuggestions', function (req, res) {

        if(req.session.fbAccessToken) {
            fbHelper.getFriends(req, function(fbResponse){

                var data = [];
                var fbData = fbResponse.data;
                for (var friend = 0; friend < fbData.length; friend++) {
                    var friendObj = {};
                    friendObj.id = fbData[friend].id;
                    friendObj.name = fbData[friend].name;
                    friendObj.picture = fbData[friend].picture.data.url;

                    data.push(friendObj);
                }
                console.log(data);
                res.send(data);
            });
        }
        else
        {
            res.redirect('/login');
        }
    });

    router.get('/autosuggestion', function (req, res) {



            var fbResponse =[ { first_name: 'Surbhi',
                name: 'Surbhi Garg',
                birthday: '01/21',
                id: '10205074352441483',
                picture: [Object] },
                { first_name: 'Aman',
                    name: 'Aman Mahajan',
                    birthday: '06/26/1990',
                    id: '966801833333955',
                    picture: [Object] },
                { first_name: 'Deendayal',
                    name: 'Deendayal Garg',
                    id: '930604666968793',
                    picture: [Object] },
                { first_name: 'Ankur',
                    name: 'Ankur Yadav',
                    id: '780418205355963',
                    picture: [Object] },
                { first_name: 'Bright',
                    name: 'Bright Summers',
                    birthday: '01/01/1990',
                    id: '375843762580257',
                    picture: [Object] },
                { first_name: 'Vada',
                    name: 'Vada Chota',
                    birthday: '01/18/1996',
                    id: '1483601298569250',
                    picture: [Object] } ];
            var  model = {data:fbResponse};

            res.render('autosuggestion', model);



    });

    router.get('/suggestions', function (req, res) {
        var searchQuery = req.query.query;

        request ({
            url: 'https://suggestqueries.google.com/complete/search',
            method: 'POST',
            dataType: 'jsonp',
            cache: false,
            data: {
                output: 'firefox',
                hl    : 'en',
                q     : searchQuery
            }
        },function(error, response, data) {
            console.log(response[1]);
            res.send(response[1]);
        });
        console.log("coming here shouldn't");
    });

};
