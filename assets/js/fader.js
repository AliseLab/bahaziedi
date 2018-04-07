var sectiontop = {};

var updatepositions = function() {
	sectiontop = {};
	$( 'section' ).each( function() {
		sectiontop[ $(this).offset().top ] = $(this);
	});
}

var unfade = function() {
	var scroll = $(window).scrollTop() + $(window).height() * 0.8;
	var el = null;
	for ( var i in sectiontop ) {
		var el = sectiontop[i];
		if ( i <= scroll ) {
			if ( el.hasClass( 'faded' ) ) {
				el.css( 'opacity', 0 ).removeClass( 'faded' ).animate({
					opacity: 1,
				}, 1500);
			}
			// TODO
			/*if ( !$( 'body' ).hasClass( 'scrolling' ) ) {
				var cls = el.attr( 'data-section' );
				$( 'header nav a' ).each( function() {
					var a = $(this);
					if ( a.attr( 'href' ) == '#' + cls ) {
						if ( !a.hasClass( 'active' ) )
							a.addClass( 'active' );
					}
					else
						a.removeClass( 'active' );
				});
			}*/
		}
	}
}

$(window).on( 'resize', function() {
	updatepositions();
	unfade();
});
$(window).on( 'scroll', unfade );

updatepositions();
setTimeout( unfade, 1 );
