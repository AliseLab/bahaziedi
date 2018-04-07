$( document ).ready( function() {
	
	var map = $( 'section.contacts iframe' );
	
	//var aligntimeout = null;
	
	var align = function() {
		/*if ( aligntimeout )
			clearTimeout( aligntimeout );
		aligntimeout = setTimeout( function() {
			aligntimeout = null;
			map.css( 'height', $( window ).height() - ( map.offset().top - $( window ).scrollTop() ) - 30 + 'px' );
		}, 0 );*/
		//map.css( 'height', $( map ).width() * 3 / 4 + 'px' );
	}
	
	$( window ).on( 'resize', align );
	align();
	
});
