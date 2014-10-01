'use strict';

var fs = require('fs');
var https = require('https');
var express = require('express');
var kraken = require('kraken-js');

var options, app, server, port;


options = {
    key: fs.readFileSync('./privkey.key'),
    cert: fs.readFileSync('./cacert.cert'),
    onconfig: function (config, next) {

        //any config setup/overrides here
        next(null, config);
    }
};

port = process.env.PORT || 8002;

app = express();
app.use(kraken(options));

server = https.createServer(options, app);
server.listen(port, function () {
    console.log('[%s] Listening on https://localhost:%d', app.settings.env, port);
});