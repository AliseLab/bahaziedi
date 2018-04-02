exports.run = function( data, next ) {
	
	var Locale = require( 'express-locale' );
	var Translate = require('express-translate');
	
	var locale = Locale();
	var translate = new Translate({
		escapeHtml: false,
	});

	data.messages = {};
	data.languages = {};
	data.fs.readdir( './messages', (err, files) => {
		files.forEach( file => {
			if ( file.substring( file.length - 3 ) == '.js' ) {
				var lang = file.substring( 0, file.length - 3 );
				var msg = require( '../messages/' + file );
				data.languages[ lang ] = msg.label;
				data.messages[ lang ] = msg.trans;
			}
		});

		translate.addLanguages( data.messages );
		
		var set_locale = function ( req, res, next ) {
			var selected_language = data.config.site.default_language;
			var lang = req.url.substring( 1 );
			var i = lang.indexOf( '?' );
			if ( i >= 0 )
				lang = lang.substring( 0, i );
			if ( lang.length > 0 ) {
				if ( data.languages[ lang ] )
					selected_language = lang;
				req.locale.toString = function() {
					return selected_language;
				}
			}
			req.language = req.locale.toString();
			next();
		}
		data.app.use( locale );
		data.app.use( set_locale );
		data.app.use( translate.middleware() );
		
		next();
	});

}
