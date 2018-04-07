exports.run = function( data, next ) {
	
	var BodyParser = require( 'body-parser' );
	var Mailer = require( 'nodemailer' );
	
	data.app.use( BodyParser.urlencoded( {
		extended: false,
	} ));
	
	data.app.post( '/order', function( req, res ) {
		
		var transport = Mailer.createTransport( data.getconfig( req.language ).mail.transport );
		
		var title = 'Order from ' + req.body.email;
		
		var reqdata = req.body;
		var products = JSON.parse( reqdata.products );
		reqdata.products = null;
		
		var total_amount = 0;
		for ( i in products ) {
			var product = products[ i ];
			total_amount += product.price * product.qty;
		}
		
		data.twig.renderFile( './views/mail.html.twig', {
			title: title,
			data: reqdata,
			products: products,
			total_amount: total_amount,
		}, ( err, html ) => {
			
			var mailOptions = {
				from: data.config.mail.destination,
				to: data.config.mail.destination,
				subject: title,
				html: html,
			};
			
			transport.sendMail( mailOptions, function( error, info ) {
				var url = '/' + req.body.lang;
				if ( error ) {
					console.log( error );
					url += '#order_failed';
				} else {
					console.log( 'Email sent: ' + info.response );
					url += '#order_ok';
				}
				res.redirect( url );
			});

		});
		
	});
	
	next();
	
}
