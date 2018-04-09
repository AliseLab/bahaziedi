exports.run = function( data, next ) {
	
	var Mailer = require( 'nodemailer' );
	
	var BodyParser = require( 'body-parser' );
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
			delivery_amount = '0.00';
		else
			delivery_amount = delivery.substring( idx + 1 );
		
		var total_amount = 0;
		for ( i in products ) {
			var product = products[ i ];
			products[i].price_total = ( +product.price * product.qty ).toFixed( 2 );
			total_amount += product.price * product.qty;
		}
		total_amount = ( +total_amount + +delivery_amount ).toFixed( 2 );
		
		var date = new Date();
		date = date.toISOString().slice(0,10);
		ordernr = date.replace(/-/g,"");
		date = date.replace(/-/g, '.');
		var counter;
		try {
			counter = data.fs.readFileSync( './counter.txt' );
		} catch ( e ) {
			counter = 0;
		}
		counter++;
		data.fs.writeFileSync( './counter.txt', counter );
		
		function zeroPad(num, places) {
			var zero = places - num.toString().length + 1;
			return Array(+(zero > 0 && zero)).join("0") + num;
		}
		
		ordernr += '-' + zeroPad( counter, 3 );
		
		data.twig.renderFile( './views/mail_admin.html.twig', {
			ordernr: ordernr,
			data: reqdata,
			products: products,
			total_amount: total_amount,
			messages: data.messages[ lang ],
			delivery_amount: delivery_amount,
		}, ( err, html ) => {
			
			var url = '/' + lang;
			var url_fail = url + '#order_failed';
			if ( err ) {
				console.log( err );
				res.redirect( url_fail );
			}
			else {
				
				data.fs.writeFileSync( './orders/' + ordernr + '.admin.html', html );
				
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

						var htmldata = {
							ordernr: ordernr,
							date: date,
							payment: reqdata.payment,
							products: products,
							delivery_amount: delivery_amount,
							total_amount: total_amount,
							full: true,
						};
						
						data.twig.renderFile( './views/' + lang + '.mail_client.html.twig', htmldata, ( err, html ) => {

							if ( err ) {
								console.log( err )
							}
							else {
							
								htmldata.full = false;
								
								data.twig.renderFile( './views/' + lang + '.mail_client.html.twig', htmldata, ( err, html2 ) => {
									data.fs.writeFileSync( './orders/' + ordernr + '.client.html', html2 );
								
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
										res.redirect( url + '?order=' + ordernr );
									});
								});
							}
						});
					}
				});
			}

		});
		
	});
	
	next();
	
}
