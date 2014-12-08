
var fs = require( 'fs' )
	, https = require( 'https' )
	, express = require( 'express' )
	, kraken = require( 'kraken-js' )
	, db = require( './lib/database.js' )
	, logger = require( 'winston' )
	, options, app, server, port;

options =
{
	key      : fs.readFileSync( './privkey.key' ) ,
	cert     : fs.readFileSync( './cacert.cert' ) ,
	onconfig : function ( config , next )
	{
		//any config setup/overrides here
		db.config( config.get( 'databaseConfig' ) );
		logger.add( logger.transports.File , { filename : config.get( 'logFile' )} );
		logger.remove( logger.transports.Console );

		next( null , config );
	}
};

app = express();

port = process.env.PORT || 8080;

app.use( kraken( options ) );

server = https.createServer( options , app );
server.listen( port , function ()
{
	console.log( '[%s] Listening on https://localhost:%d' , app.settings.env , port );
} );