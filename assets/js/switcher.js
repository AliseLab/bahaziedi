$( document ).ready( function() {
	
	$( '.switcher' ).each( function() {
		var switcher = $(this);
		switcher.on( 'click', 'a', function() {
			var thishref = $(this).attr( 'href' );
			switcher.find( 'a' ).each( function() {
				if ( $(this).attr( 'href' ) != thishref )
					$(this).removeClass( 'active' );
			});
			$(this).addClass( 'active' );
		});
	});
	
} );
