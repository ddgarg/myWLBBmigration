'use strict';

var fs = require('fs');
var https = require('https');
var express = require('express');
var kraken = require('kraken-js');
var db = require('./lib/database.js');
var logger = require('winston');

var options, app, server, port;


options = {
    key: fs.readFileSync('./privkey.key'),
    cert: fs.readFileSync('./cacert.cert'),
    onconfig: function (config, next) {

        db.config(config.get('databaseConfig'));
        logger.add(logger.transports.File, { filename: config.get('logFile')});
        logger.remove(logger.transports.Console);
        //any config setup/overrides here
        next(null, config);
    }
};
app = express();

port = process.env.PORT || 8080;


app.use(kraken(options));


// Uncomment below changes to run on http. make sure to comment https changes.
//app.listen(port, function () {
//    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
//});

server = https.createServer(options, app);
server.listen(port, function () {
    console.log('[%s] Listening on https://localhost:%d', app.settings.env, port);
});