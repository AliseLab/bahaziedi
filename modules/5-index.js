exports.run = function( data, next ) {

	var sections = [ 'bubblegum', 'candy', 'pastilla', 'pastilla2', 'contacts', 'order' ];
	
	var product_images_path = '/img/products/';
	var product_images = {};
	data.fs.readdir( './public' + product_images_path, ( err, products ) => {
		
		if ( err )
			console.log( err );
		else {
		
			var done = () => {
			
				var render_func = function( req, res ) {
					
					var order = null;
					
					var pos = req.url.indexOf( '?order=' );
					if ( pos >= 0 ) {
						var filename = './orders/' + req.url.substring( pos + 7 ) + '.client.html';
						try {
							order = data.fs.readFileSync( filename );
						}
						catch ( e ) {
							res.redirect( '/' + req.language );
						}
						data.fs.unlinkSync( filename );
					}
					
					res.render( 'index.html.twig', {
						'order' : order,
						'languages' : data.languages,
						'language' : req.language,
						'sections' : sections,
						'config' : data.getconfig( req.language ),
						'js' : data.js,
						'css' : data.css,
						'product_images' : product_images,
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
			};
			
			var i = 0;
			products.forEach( product => {
				data.fs.readdir( './public' + product_images_path + product, ( err, images ) => {
					if ( err )
						console.log( err );
					product_images[ product ] = [];
					images.forEach( image => {
						var path = product_images_path + product + '/';
						product_images[ product ].push( {
							original: path + image,
							preview: path + image, // TODO
						} );
					});
					i++;
					if ( i == products.length )
						done();
				});
			});
			
		}
	});
}
