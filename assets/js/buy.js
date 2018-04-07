$( document ).ready( function() {
	
	var basket = $( 'header .basket' );
	var basketlink = $( 'header .basket-icon' );
	var basketqty = basketlink.find( '.qty' );
	
	var product_names = {};
	var product_prices = {};
	var product_img = {};

	$( '.product[data-product]' ).each( function() {
		product_names[ $(this).attr( 'data-product' ) ] = $(this).find( 'h1' ).html();
		product_prices[ $(this).attr( 'data-product' ) ] = $(this).find( '.buy .price' ).html().replace( /€/, '' ).trim();
		product_img[ $(this).attr( 'data-product' ) ] = $(this).find( 'img:first' ).attr( 'src' );
	});
	
	
	var basketitems = basket.find( '.items' );
	
	var productstable = $( 'form.order table.products');
	var productshead = productstable.find( 'tr:first' );
	var submitorder = $( 'form.order input[type="submit"]' );
	var productstotalqty = productstable.find( '.total_qty' );
	var productstotalamount = productstable.find( '.total_amount' );

	var open_basket = () => {
		basketlink.addClass( 'active' );
		basket.slideDown( 'fast' );
	}
	
	var close_basket = () => {
		basket.slideUp( 'fast' );
		basketlink.removeClass( 'active' );
	}
	
	basket.find( 'a.btn' ).click( function() {
		close_basket();
	});
	
	var update_basket = () => {
		var items = basketitems.find( '.item' );

		productstable.find( 'tr.product' ).remove();
		
		if ( items.length > 0 ) {
			basketlink.css( 'visibility', 'visible' );
			var total_qty = 0;
			var total_amount = 0;
			items.each( function() {
				var product = $( this ).attr( 'data-product' );
				var qty = +$( this ).find( '.qty' ).val();
				var price = product_prices[ product ];
				var title = $( this ).find( '.title' ).html();
				var sumamount = price * qty;
				total_qty += qty;
				total_amount += sumamount;
				
				var tr = $( '<tr></tr>' ).addClass( 'product' );
				$( '<td></td>' ).html( title + ' x ' + qty ).appendTo( tr );
				$( '<td></td>' ).html( qty ).appendTo( tr );
				$( '<td></td>' ).html( '&euro;' + sumamount.toFixed( 2 ) ).appendTo( tr );
				tr.insertAfter( productshead );
			});
			basketlink.find( '.qty' ).html( total_qty );
			basket.find( '.total .amount' ).html( '&euro;' + total_amount.toFixed( 2 ) );
			
			productstotalqty.html( total_qty );
			productstotalamount.html( '&euro;' + total_amount.toFixed( 2 ) );
			
			submitorder.show();
		}
		else {
			close_basket();
			basketlink.removeClass( 'active' ).css( 'visibility', 'hidden' );
			submitorder.hide();
		}
	}
	
	basketitems.on( 'click', '.delete', function() {
		$(this).closest( 'div' ).stop( true ).fadeOut( 'fast', function() {
			$(this).remove();
			update_basket();
		});
	});
	
	var qty_change = function() {
		if ( $(this).val() !== '' ) {
			if ( +$(this).val() < 1 )
				$(this).val( 1 );
		}
		update_basket();
	}
	
	basketitems.on( 'click', '.qty', qty_change );
	basketitems.on( 'keyup', '.qty', qty_change );
	basketitems.on( 'change', '.qty', qty_change );
	
	var add_to_basket = ( item ) => {
		
		var itemdiv = basketitems.find( 'div[data-product="' + item + '"]' );
		if ( itemdiv.length == 0 ) {
		
			var itemdiv = $( '<div></div>' )
				.addClass('item')
				.attr( 'data-product', item )
			;
			
			$( '<img alt="" src="' + product_img[ item ] + '"/>' ).appendTo( itemdiv );
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
			close_basket();
		}
		else {
			open_basket();
		}
	});
	
});
