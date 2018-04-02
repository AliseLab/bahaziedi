exports.run = function( data, next ) {
	
	data.app.listen( data.config.server.port, function() {
		console.log( 'listening on ' + data.config.server.port )
	} );

	next();
}
