exports.run = function( data, next ) {

	var render_func = function( req, res ) {
		res.render( 'index.html.twig', {
			'languages' : data.languages,
			'language' : req.language,
			'config' : data.getconfig( req.language ),
			'js' : data.js,
			'css' : data.css,
		});
	}
	
	data.app.get( '/', function( req, res ) {
		var selected_language = data.config.site.default_language;
		var to_try = [];
		to_try = to_try.concat([
			req.locale.toString(),
			req.locale.language,
		]);
		to_try.some( lang => {
			if ( data.languages[ lang ] ) {
				selected_language = lang;
				return true;
			}
			return false;
			
		});
		res.redirect( '/' + selected_language );
	});
	
	for ( lang in data.languages ) {
		data.app.get( '/' + lang, render_func );
	}
	
	next();
}
