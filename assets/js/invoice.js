var invoice = $( 'div.invoice' );
if ( invoice.length > 0 ) {
	var fader = $( '.fader' );
	fader.show();

	var invoicew = invoice.outerWidth();
	var invoiceh = invoice.outerHeight();
	
	var align_invoice = function() {
		
		var windoww = $( window ).innerWidth();
		var windowh = $( window ).innerHeight();
		
		var invoicetop = ( invoiceh < windowh ) ? ( windowh - invoiceh ) / 2 : 0;
		var invoiceleft = ( invoicew < windoww ) ? ( windoww - invoicew ) / 2 : 0;
		
		var overflowy, bodyoverflowy;
		if ( invoiceh < windowh ) {
			overflowy = 'hidden';
			bodyoverflowy = 'auto';
		}
		else {
			overflowy = 'auto';
			bodyoverflowy = 'hidden';
		}
		
		invoice.css( {
			position: 'fixed',
			left: invoiceleft + 'px',
			top: invoicetop + 'px',
			right: invoiceleft + 'px',
			bottom: invoicetop + 'px',
			'overflow-y': overflowy,
		});
		
		$( 'body' ).css( 'overflow-y', bodyoverflowy );
	};
	align_invoice();
	$( window ).on( 'resize', align_invoice );
	
	fader.on( 'click', function() {
		invoice.stop( true ).fadeOut( 'fast' );
		fader.stop( true ).fadeOut( 'fast' );
	});
}
