var hash = window.location.hash;
if (hash.substring(0, 1) == '#') {
	hash = hash.substring(1);
	if (hash != '') {
		var notif = $('.notification.' + hash);
		if (notif.length > 0) {
			var fader = $( '.fader' );
			notif.show();
			fader.show();
			
			window.location.hash = '';
			
			setTimeout( function() {
				notif.fadeOut( 'slow' );
				fader.fadeOut( 'slow' );
			}, 5000 );
		}
	}
}
