var BASE_HEIGHT			= 768;
var BASE_WIDTH			= 1024;
var MIN_SCALE			= 0.66;
var windowScale			= 1.0;
var $iOS;
var preloader;
var openingBill			= false;

/* video sharing vars -----------------------------------------------------*/
var url		= "http://www.youtube.com/watch?v=p6wk1XySBTk";
var text 	= "Watch the new trailer Hansel %26 Gretel: Witch Hunters, starring Jeremy Renner %26 Gemma Arterton";
var media = "http://path.to/image/to/pin.jpg";
var via		= "HanselGretel3D";
/*-----------------------------------------------------------*/


$(document).ready( function(){
	initVars();
	initListeners();
	completeInit();
});



function initVars() {
	var deviceAgent = navigator.userAgent.toLowerCase();
	//windows phone, android
	$iOS = deviceAgent.match(/(iphone|ipod|ipad)/);
	preloader = new ImagePreloader( this );
}

function initListeners() {
	$(window).resize( function(){
		if( !openingBill )
		{
			$('#bill-wrapper').hide();
		}		
		setWindowScale();
		checkScale();
	});
	
	$("#rollover_image").hover( 
		function(eventObject) {
			$("#rollover_image").fadeTo( 200, 1.0 );
		}
	)
	$("#rollover_image").mouseout( 
		function(eventObject) {
			$("#rollover_image").fadeTo( 200, 0.0 );
		}
	)
	
	$('.billshow').click(function(){
		$("#bill-wrapper").show();
		if ( !$iOS )
		{
			var dh = $("#legalfooterContainer").offset().top - 106;
			$('#bill-wrapper').css( "margin-top", dh );
		} else {
			openingBill = true;
		}
		
	});
	
	$('#bill_close').click(function(e){
		$('#bill-wrapper').hide();
		if ( !$iOS )
		{
			$('#bill-wrapper').css( "margin-top", 0 );
		} else {
			openingBill = false;
		}
	});
	

	// a user selects the input box
	$('#shareInput').live('click', function() {
		$(this).select();

		// you could use a plugin here to copy to a user's clipboard
		// but it's kind of a pain in the ass

	});

	// a user clicks one of the share buttons
	$('.shareBtn').live('click', function() {
		shareMe($(this).attr('data-platform'));
		return false;
	});
	
	
	//--------- Rollovers for Desktops only -------//
	if ( !$iOS )
	{
	
		// ------ Video Sharing Box Slide -----//
		$('#box').hover(function(){
			$(this).animate( { 'margin-top' : 60 }, 200 );
		}, function(){
			$(this).animate( { 'margin-top' : 32}, 200 );
		});
		
		//---- Video Sharing Button Rollovers -----//
		$("#shareFb").mouseenter( function(e) {
			$("#shareFb").animate( { 'opacity' : '1.0' }, 100 );
		});
		
		$("#shareFb").mouseleave( function(e) {
			$("#shareFb").animate( { 'opacity' : '0.0' }, 200 )
		});
		
		$("#shareTw").mouseenter( function(e) {
			$("#shareTw").animate( { 'opacity' : '1.0' }, 100 );
		});
		
		$("#shareTw").mouseleave( function(e) {
			$("#shareTw").animate( { 'opacity' : '0.0' }, 200 )
		});
		

		$("#remind_image").mouseenter( function(e) {
			$("#remind_image").attr( "src", "images/remind_hover.png" );
		});
		
		$("#remind_image").mouseleave( function(e) {
			$("#remind_image").attr( "src", "images/remind_link.png" );
		});
		
	} else {
		$('#box').bind('click', function(){
			var open = $(this).attr('data-open');
			if (open) {
				$(this).animate( { 'margin-top' : -60 }, 200 ).removeAttr('data-open');
			} else {
				$(this).animate( { 'margin-top' : -30 }, 200 ).attr('data-open', 'true');
			}
		});
	}
		
		
		
}

function completeInit() {

	setWindowScale();
	checkScale();
	$("#bill-wrapper").hide();
	
	//------ Start Preload --------//
	
	//$("#page_wrapper").css( {"opacity" : "0.0" } );
	$("#sharing").css( {"opacity" : "0.0" } );
	$("#legalfooterContainer").css( {"opacity" : "0.0" } );

	preloader.add( "images/background1.jpg", "background1" );
	preloader.add( "images/backgroundi.jpg", "backgroundi" );
	preloader.add( "images/vid_placeholder_720.png", "vid_placeholder_720" );
	preloader.add( "images/vid_placeholder.png", "vid_placeholder" );
	preloader.add( "images/title_treatment.png", "title_treatment" )
	preloader.add( "images/coming_soon.png", "coming_soon" );
	preloader.add( "images/share-box.png", "share-box" );
	preloader.add( "images/vshare_facebook.png", "vshare_facebook" );
	preloader.add( "images/vshare_twitter.png", "vshare_twitter" );
	preloader.add( "images/share_glow_f.png", "share_glow_f" );
	preloader.add( "images/share_glow_t.png", "share_glow_t" );
	preloader.add( "images/footer_international.png", "footer_international" );
	preloader.add( "images/close_x.png", "close_x" );
	preloader.load();
	
}


function setWindowScale() {
	windowScale = window.innerHeight / BASE_HEIGHT;
}







//--------------- Handling Resizes ------------------//
/*-----------------------------------------------------------*/

/*-----------------------------------------------------------*/



function checkScale() {

	// --- preloader --- //
	var preloadTop = ( $(window).height() / 2 ) - 60;
	$("#preloader").css( "margin-top", preloadTop );


	// --- Desktop Only Below Here --- //
	if( $iOS ) {
		return;
	}
	

	//------ Shrink the player in short or narrow windows -------//
	if( $(window).height() <= 971 && $(window).width() <= 1280 )
	{
		$("#page_wrapper").css( "min-width", "720px");
		$("#player_container").css( "width", 720 );
		$("#player_container").css( "height", 415 );
		$("#player_container").css( { "background-image" : "url(images/vid_placeholder_720.png)" } );
		$("#player").css( "width", 689 );
		$("#player").css( "height", 383 );
		$("#player").css( { "margin-top" : "16px", "margin-left" : "16px", "border-style" : "none", "border-color" : "#333333" } );
		$("#player iframe").css( "width", 689 );
		$("#player iframe").css( "height", 383 );
		$("#legalfooterContainer").css( "top", 670 );
		$("#legalfooterContainer").css( "bottom", "auto" );
		$("#legalfooterContainer").css( "min-width", "720px");
	

	} else {
	
		$("#page_wrapper").css( "min-width", "1159px")
		$("#player_container").css( "width", 1159  );
		$("#player_container").css( "height", 665 );
		$("#player_container").css( "background-image", "url(images/vid_placeholder.png)" );
		$("#player").css( "width", 1122 );
		$("#player").css( "height", 627 );
		$("#player").css( { "margin-top" : "23px", "margin-left" : "23px", "border-style" : "none" } );
		$("#player iframe").css( "width", 1122 );
		$("#player iframe").css( "height", 627 );;
		$("#legalfooterContainer").css( "min-width", "1159px");
		
		if( $(window).height() <= 1000 )
		{
			$("#legalfooterContainer").css( "top", 940 );
			$("#legalfooterContainer").css( "bottom", "auto" );
		} else {
			$("#legalfooterContainer").css( "top", "auto" );
			$("#legalfooterContainer").css( "bottom", 0 );
		}
		
	}
	

	/*
	if ( $(window).width() < 1168 ) 
	{
		$("body").css( { "background-size" : "1168px)" } );
	} else {
		$("body").css( { "background-size" : "100%)" } )
	}
	*/
	
	//console.log( "current height: " + $(window).height() );

}


function notop(){}

function openRegistration() {
	
	window.open("register.html", "_blank", "width=600, height=800" );
}







//--------------- Video Sharing ------------------//
/*-----------------------------------------------------------*/
/* function		: shareMe
/* attributes	: platform - the sharing platform we're using
/* description: opens the appropriate sharing window for
/*							sharing...
/*-----------------------------------------------------------*/
function shareMe(platform) {

	// set the url to open based on the sharing platform
	switch(platform) {
		case 'facebook':
			shareURL = 'https://www.facebook.com/sharer.php?u='+url;
		break;
		case 'twitter':
			shareURL 	= 'http://twitter.com/share?url='+url+'&text='+text+'&via='+via;
		break;
		case 'pinterest':
			shareURL 	= 'http://pinterest.com/pin/create/button/?url='+url+'&media='+media+'&description='+text;
		break;
	}

	// open the sharing window
	myWindow = window.open(shareURL, 'Sharer','toolbar=0,status=0,width=626,height=436');

	// center the sharing window
	myWindow.moveTo($("#share").offset().left + window.screenX + 70, $("#share").offset().top + window.screenY + 170);

	return false;
}





//--------------- OnLoad Handler ------------------//
/*-----------------------------------------------------------*/
/*-----------------------------------------------------------*/


function onImageLoaded() {
	if ( preloader.imagesLoaded == preloader.imagesTotal )
	{
		//----- Fade Everything in -----//
		$("#page_wrapper").css( 'background-image', "url(images/background1.jpg)" );
		$("#preloader").html( "<i> <br> <br>100</i>" ); 
		$("#preloader").animate( { opacity:0.0 }, 500, function(){ $("#preloader_layer").hide() } );
		$("#page_wrapper").delay( 500 );
		$("#page_wrapper").animate( { opacity:1.0 }, 1000 );
		//$("#page_wrapper").delay( 500 );
		//$("#page_wrapper").animate( { opacity:1.0 }, 1000 );
		$("#sharing").delay( 1000 );
		$("#sharing").animate( { opacity:1.0 }, 1000 );
		$("#legalfooterContainer").delay( 1000 );
		$("#legalfooterContainer").animate( { opacity:1.0 }, 1000 );
		
		
		
		/*-- Video player with tracking --*/
		$("#player").html("");	
		setTimeout(function(){
		YT_Tracking.gaReference = _gaq;
		YT_Tracking.createSmartYTPlayer("p6wk1XySBTk", "#player", 1122, 627, true);
		YT_Tracking.startPollingPlayer("#player");
		setTimeout(function(){
			checkScale();
		},500);
		},1500);
		
	} else {
		var pct = Math.round( preloader.imagesLoaded / preloader.imagesTotal * 100 );
		$("#preloader").html( "<i> <br> <br>" + pct + "</i>" ); 
	}
	
	

	

}

