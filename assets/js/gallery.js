$( document ).ready( function() {
	
	$( '.gallery' ).each( function() {
		var gallery = $(this);
		
		var preview = $(this).find( '> .preview' );
		
		if ( preview.length ) {
			
			preview.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				speed: 300,
				autoplay: true,
				autoplaySpeed: 5000,
			});
			
			preview.on( 'mousedown', function() {
				return false;
			});

			var clicked = false;
			
			preview.find( 'a' ).each( function() {
				var a = $(this);
				a.on( 'click', function() {
					var lastclicked = clicked;
					clicked = false;
					return lastclicked;
				});
				var img = a.find( 'img' );
				img.on( 'click', function() {
					clicked = true;
				});
			});
			
		}
		
	});
	
});
