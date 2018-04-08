exports.run = function( data, next ) {
	
	var BodyParser = require( 'body-parser' );
	var Mailer = require( 'nodemailer' );
	
	data.app.use( BodyParser.urlencoded( {
		extended: false,
	} ));
	
	data.app.post( '/order', function( req, res ) {
		
		var transport = Mailer.createTransport( data.getconfig( req.language ).mail.transport );
		
		var reqdata = req.body;
		var products = JSON.parse( reqdata.products );
		var delivery = reqdata.delivery;
		var lang = reqdata.lang;
		delete reqdata.products;
		delete reqdata.lang;
		delete reqdata.delivery;
		
		var delivery_amount;
		var idx = delivery.indexOf( '€' );
		if ( idx < 0 )
			delivery_amount = 0;
		else
			delivery_amount = delivery.substring( idx + 1 );
		
		var total_amount = 0;
		for ( i in products ) {
			var product = products[ i ];
			products[i].price_total = ( +product.price * product.qty ).toFixed( 2 );
			total_amount += product.price * product.qty;
		}
		total_amount = ( +total_amount + +delivery_amount ).toFixed( 2 );
		
		data.twig.renderFile( './views/mail.html.twig', {
			data: reqdata,
			products: products,
			total_amount: total_amount,
			messages: data.messages[ lang ],
			delivery_amount: delivery_amount,
		}, ( err, html ) => {
			
			var url = '/' + lang;
			var url_ok = url + '#order_ok';
			var url_fail = url + '#order_failed';
			if ( err )
				res.redirect( url_fail );
			else {
				
				transport.sendMail({
					from: data.config.mail.destination,
					to: data.config.mail.destination,
					subject: data.messages[ lang ].mail_title,
					html: html,
				}, function( error, info ) {
					if ( error ) {
						console.log( error );
						res.redirect( url_fail );
					} else {
						console.log( 'Email sent: ' + info.response );
						
						transport.sendMail({
							from: data.config.mail.destination,
							to: reqdata.email,
							subject: data.messages[ lang ].mail_order,
							html: html,
						}, function( error, info ) {
							if ( error ) {
								console.log( error );
							} else {
								console.log( 'Email sent: ' + info.response );
							}
							res.redirect( url_ok );
						});
					}
				});
			}

		});
		
	});
	
	next();
	
}
