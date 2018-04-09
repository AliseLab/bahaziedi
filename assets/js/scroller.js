$( document ).ready( function() {
	
	var scrolling_to = null;
	
	var scroll_to_section = ( href ) => {
		var target = $( href );
		if ( target.length > 0 ) {
			var target_id = target.attr( 'id' );
			if ( scrolling_to != target_id ) {
				scrolling_to = target_id;
				target.attr( 'id', '' );
				$( 'body' ).addClass( 'hashchange' );
				window.location.hash = href;
				$( 'body' ).removeClass( 'hashchange' );
				target.attr( 'id', target_id );
				$( 'body' ).addClass( 'scrolling' );
				var targettop = target.offset().top;
				if ( $( window ).height() > 300 )
					targettop -= $( 'header' ).height();
				else
					targettop -= 20;
				$( 'html, body' ).stop().animate( {
					scrollTop: targettop,
				}, 400, function() {
					scrolling_to = null;
					$( 'body' ).removeClass( 'scrolling' );
				} );
			}
			return true;
		}
		return false;
	};
	
	$( 'body' ).on( 'click', 'a.menu', function() {
		var href = $(this).attr( 'href' );
		if ( href.substring( 0, 1 ) == '#' ) {
			scroll_to_section( href );
			return false;
		}
	});
	
	var checkhash = function() {
		if ( !$( 'body' ).hasClass( 'hashchange' ) )
		{
			if ( !scroll_to_section( window.location.hash ) ) {
				$( 'a[href="#home"]' ).click();
				$( window ).scrollTop( 0 );
			}
		}
		$( '.languages a' ).each( function() {
			var href = $(this).attr( 'href' );
			var strpos = href.indexOf( '#' );
			if ( strpos >= 0 )
				href = href.substring( 0, strpos );
			$(this).attr( 'href', href + window.location.hash );
		});
	};
	
	$( window ).bind( 'hashchange', checkhash);
	setTimeout( checkhash, 100 );
	
	var checkhashtimeout = null;
	$( window ).resize( function( e ) {
		if ( e.originalEvent ) {
			if ( checkhashtimeout )
				clearTimeout( checkhashtimeout );
			checkhashtimeout = setTimeout( function() {
				checkhashtimeout = null;
				// checkhash(); // tmp disabled because mobile devices
			}, 100 );
		}
	} );
	
});
