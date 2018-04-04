$( document ).ready( function() {
	
	var basket = $( 'header .basket' );
	var basketlink = $( 'header .basket-icon' );
	var basketqty = basketlink.find( '.qty' );
	
	var product_names = {};
	$( '.product[data-product]' ).each( function() {
		product_names[ $(this).attr( 'data-product' ) ] = $(this).find( 'h1' ).html();
	});
	
	var product_prices = {};
	$( '.product[data-product]' ).each( function() {
		product_prices[ $(this).attr( 'data-product' ) ] = $(this).find( '.buy .price' ).html().replace( /€/, '' ).trim();
	});
	
	var basketitems = basket.find( '.items' );
	
	var update_basket = () => {
		var items = basketitems.find( '.item' );
		if ( items.length > 0 ) {
			basketlink.css( 'visibility', 'visible' );
			var total_qty = 0;
			var total_amount = 0;
			items.each( function() {
				var product = $( this ).attr( 'data-product' );
				var qty = +$( this ).find( '.qty' ).val();
				var price = product_prices[ product ];
				total_qty += qty;
				total_amount += price * qty;
			});
			basketlink.find( '.qty' ).html( total_qty );
			basket.find( '.total .amount' ).html( total_amount.toFixed( 2 ) + '&euro;' );
		}
		else {
			basket.slideUp( 'fast' );
			basketlink.removeClass( 'active' ).css( 'visibility', 'hidden' );
		}
	}
	
	basketitems.on( 'click', '.delete', function() {
		$(this).closest( 'div' ).stop( true ).fadeOut( 'fast', function() {
			$(this).remove();
			update_basket();
		});
	});
	
	basketitems.on( 'click', '.qty', update_basket );
	basketitems.on( 'keyup', '.qty', update_basket );
	basketitems.on( 'change', '.qty', update_basket );
	
	var add_to_basket = ( item ) => {
		
		var itemdiv = basketitems.find( 'div[data-product="' + item + '"]' );
		if ( itemdiv.length == 0 ) {
		
			var itemdiv = $( '<div></div>' )
				.addClass('item')
				.attr( 'data-product', item )
			;
			
			$( '<a class="title" href="#' + item + '"></a>' ).html( product_names[ item ] ).appendTo( itemdiv );
			$( '<input type="number" class="qty" value="1" min="1"/>' ).appendTo( itemdiv );
			$( '<i class="delete fas fa-trash-alt"></i>' ).appendTo( itemdiv );
			
			itemdiv.appendTo( basketitems );
		
		}
		else {
			var qty = itemdiv.find( '.qty' );
			qty.val( +qty.val() + 1 );
		}
		update_basket();
	}
	
	$( '.buy' ).on( 'click', 'button', function() {
		
		var button = $(this);
		var product = button.closest( '.product' );
		var img = product.find( 'img:first' );
		var qty = product.find( 'input' ).val();
		
		var maxanims = qty;
		//if ( maxanims > 10 )
			//maxanims = 10;
		
		var timeout = 200 / maxanims;
		
		for ( var i = 0 ; i < maxanims ; i++ ) {
			setTimeout( function() {
				var imganim = img.clone().attr( 'data-i', i ).css({
					position: 'fixed',
					left: ( img.offset().left - $(window).scrollLeft() ) + 'px',
					top: ( img.offset().top - $(window).scrollTop() ) + 'px',
					width: img.width() + 'px',
					height: img.height() + 'px',
					'z-index': 150,
				}).appendTo( product ).animate({
					left: ( basketlink.offset().left - $(window).scrollLeft() ) + 'px',
					top: ( basketlink.offset().top - $(window).scrollTop() ) + 'px',
					width: basketlink.width() + 'px',
					height: basketlink.height() + 'px',
					opacity: 0.5,
				}, 400, function() {
					imganim.remove();
					
					add_to_basket( product.attr( 'data-product' ) );
				});
			}, i * timeout );
		
		}
		
		return false;
	});
	
	
	basketlink.on( 'click', function() {
		if ( basketlink.hasClass( 'active' ) ) {
			basket.slideUp( 'fast' );
			basketlink.removeClass( 'active' );
		}
		else {
			basketlink.addClass( 'active' );
			basket.slideDown( 'fast' );
		}
	});
	
});
