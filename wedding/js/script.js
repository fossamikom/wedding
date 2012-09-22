			$(function() {
			
				var Page = (function() {

					var config = {
							$bookBlock		:	$( '#bb-bookblock' ),
							$navNext			:	$( '#bb-nav-next' ),
							$navPrev			:	$( '#bb-nav-prev' ),
							$folder				:	$( '#folder' ),
							$folderOpen		:	$( '#folder > div.folder-cover > span' ),
							$folderClose	:	$( '#folder > div.folder-inner > a' ),
							transEndEventNames	:	{
								'WebkitTransition'	: 'webkitTransitionEnd',
								'MozTransition'			: 'transitionend',
								'OTransition'				: 'oTransitionEnd',
								'msTransition'			: 'MSTransitionEnd',
								'transition'				: 'transitionend'
							},
							// init bookBlock!
							bb					:	$( '#bb-bookblock' ).bookblock( {
								speed 			: 700,
								easing			: 'ease-out',
								perspective	: 1500,
								shadowSides	: 0.8,
								shadowFlip	: 0.7
							} ),
							transitionProperty	:	{
								'-webkit-transition'	: '-webkit-transform 300ms ease-in-out',
								'-moz-transition'			: '-moz-transform 300ms ease-in-out',
								'-o-transition'				: '-o-transform 300ms ease-in-out',
								'-ms-transition'			: '-ms-transform 300ms ease-in-out'
							}
						},
						init = function() {

							initEvents();

						},
						initEvents = function() {

							config.$navNext.on( 'click', function() {

								checkFolder( function() {

									config.bb.next();	

								} );
								
								return false;

							} );

							config.$navPrev.on( 'click', function() {
								
								checkFolder( function() {

									config.bb.prev();
									
								} );
								return false;

							} );

							// swipe event : http://jquerypp.com/#swipe
							config.$bookBlock.children().on( {

								'swipeleft' : function( event ) {

									checkFolder( function() {

										config.bb.next();
										
									} );

									return false;

								},
								'swiperight' : function( event ) {

									checkFolder( function() {

										config.bb.prev();
										
									} );

									return false;

								}

							} );

							// folder
							config.$folderOpen.on( 'click', function() {
								
								var $folder = $( this ).closest( 'div.folder' ),
										open = $folder.data( 'isOpen' );

								if( config.bb.isActive() ) return false;

								if( !open ) {

									openFolder();

								}

								return false;

							} );

							config.$folderClose.on( 'click', function() {
								
								var $folder = $( this ).closest( 'div.folder' ),
										open = $folder.data( 'isOpen' );

								if( config.bb.isActive() ) return false;
								
								if( open ) {

									closeFolder();

								}

								return false;

							} );

						},
						openFolder	= function() {

							var $fold = config.$folder.find( 'div.folder-fold' ).css( config.transitionProperty ),
									$inner = config.$folder.find( 'div.folder-inner' ),
									transEndEventName = config.transEndEventNames[ Modernizr.prefixed( 'transition' ) ];

							setTimeout( function() {

								$fold.css( 'transform', 'rotateY(180deg)' ).on( transEndEventName , function() {

									$fold.off( transEndEventName ).css( 'z-index', 1 ).css( 'transition', 'none' ).css( 'transform', 'rotateY(-180deg)' );
									$inner.css( 'transform', 'translateX(310px)' );

								} );

								config.$folder.data( 'isOpen', true );

							}, 0 );
							

						},
						closeFolder	= function() {

							var $fold = config.$folder.find( 'div.folder-fold' ),
									$inner = config.$folder.find( 'div.folder-inner' ),
									transEndEventName = config.transEndEventNames[ Modernizr.prefixed( 'transition' ) ];

							$inner.css( 'transform', 'translateX(0px)' ).on( transEndEventName , function() {

								$inner.off( transEndEventName );

								$fold.css( 'transform', 'rotateY(180deg)' );

								setTimeout( function() {

									$fold.css( config.transitionProperty ).css( {
										transform	: 'rotateY(0deg)',
										zIndex		: 4

									} ).on( transEndEventName , function() {

										$fold.off( transEndEventName );

									} );

								}, 0 );

							} );

							config.$folder.data( 'isOpen', false );

						},
						checkFolder	= function( callback ) {

							var $fold = config.$folder.find( 'div.folder-fold' ),
									transEndEventName = config.transEndEventNames[ Modernizr.prefixed( 'transition' ) ];

							if( config.$folder.data( 'isOpen' ) ) {

								$fold.on( transEndEventName , function() {

									$fold.off( transEndEventName );
									callback.call();

								} );

								closeFolder();

							}
							else {

								callback.call();

							}

						};


					return { init : init };

				})();

				Page.init();
			
			});
