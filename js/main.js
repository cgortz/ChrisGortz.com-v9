var _currentThumb = -1;
var _currentSection;
var _isTouch = false;

$(document).ready( function(){

	isTouch = !!('ontouchstart' in window) // works on most browsers 
	
	// HISTORY.JS
	History.Adapter.bind( window, 'statechange',function(){
		var History = window.History;
	    var State = History.getState();
		displaySection( State.data.state );
	});


	//imagesLoaded listener is a jquery plugin
	$('#main_content img').imagesLoaded( initSite );
	
	
	
} );


function initSite() {
	$(window).mousemove(function(e) {
	});
	
	$(window).resize(function(e) {
	} );
	
	$("#light_box").click( function(e) {closeBox(e.target)} );
	if (!_isTouch ) $(".projectThumb").mouseenter( function() { onOverThumb( $(this) ) } );
	$(".projectThumb").mouseleave( function() { onOutThumb( $(this) ) } );
	$(".projectThumb").click( function() { onClickThumb( $(this) ) } );
	$("#chris_gortz").click(function() { navigateToSection( "main" ); } );
	
	
	// ********* Get the Initial Page ******** // 

	var hstate = History.getState();
	var section = hstate.url.split("?")[1];
	if( section ) section = section.split("=")[1];
	if( !section ) 
	{
		section = "main"; 
	} else {
	
		// if subsections are needed
		var ssi = section.split("sub")[1];
		
		if( ssi ) 
		{
			subSectionIndex = ssi;
		} else {
			subSectionIndex = -1;
		}
		section = section.split("sub")[0];
	}
	console.log("should be navigating to: " + section);
	navigateToSection( section );
	displaySection( section );
	
	$("body").animate( {opacity:1.0}, 400 );
}


function openFlashBox( $file, $width, $height ) {
	if ( !swfobject ) return;
	//console.log( "file:" + $file + " w:" + $width + " h:" + $height );
	$("#light_box").css( "display", "block");
	var flashvars = {
	};
	var params = {
		menu:"false",
		base:"",
		allowScriptAccess:"always",
		wmode:"transparent"
	};		
	var attributes = {
		id:"flashContent"
	};
	
	if ( !_isTouch ) $("#flashContent").html( "" ); 
		$("#light_box").animate( {opacity:1.0}, 500, function() { 
		$("#flashContent").css( "display", "block" );
		$("#imageContent").css( "display", "none" );
		if( !_isTouch ) {
			$("#light_box_content").css( "background-color", "transparent" );	
			$("#light_box_content").css( { width:$width+"px", height:$height+"px"} );
			swfobject.embedSWF( $file, "flashContent", $width, $height, "10.0.0", null, flashvars, params, attributes);
		} else {
			$("#light_box_content").css( { width:"300px" } );
		}
		 
	});
}


function openImageBox( $file, $width, $height ) {
	$("#light_box").css( "display", "block");
	$("#flashContent").css( "display", "none" );
	$("#imageContent").css( "display", "block" );
	$("#light_box").animate( {opacity:1.0}, 500, function() { 
		$("#light_box_content").css( "background-color", "transparent" );	
		$("#light_box_content").css( { width:$width+"px", height:$height+"px"} );
		$("#imageContent").children("img").css( { width:$width+"px", height:$height+"px"} );
		$("#imageContent").children("img").attr( "src", $file ); 
	});

}

function closeBox( $clickTarget ) {
	if( $($clickTarget).attr("id") != "light_box") return;
	$("#light_box").animate( { opacity:0.0 }, 400, function() {
		$("#light_box").css( "display","none" );
		$("#flashContent").css( "display","none" );
		$("#imageContent").css( "display","none" );
		$("#imageContent").children("img").attr( "src","" );
	});
}

function navigateToSection( $sectionName ) {
	switch( $sectionName )
	{
		case "about":
			History.pushState( { state:"about" }, "Chris Gortz - About Me", "?section=about");
			break;
		default:
			History.pushState( { state:"main" }, "Chris Gortz - Portfolio", "?section=main");
			break;
	}
}

function displaySection( $sectionName ) {
	if ( _currentSection == $sectionName ) return;
	console.log("display section being called on " + $sectionName );
	switch( $sectionName )
	{
		case "about":
			_currentSection = "about";
			$("#about_page").css( "display", "block" );
			$("#main_content").css( "display", "none" );
			$("#otherPageLink").attr( "href", "javascript:navigateToSection('main')");
			$("#otherPageLink").html( "Main Page");
			$("#about_page").css( "opacity", "0.0" );
			$("#about_page").animate( { opacity:1.0 }, 500 );
			break;
		default:
			_currentSection = "main";
			$("#about_page").css( "display", "none" );
			$("#main_content").css( "display", "block" );
			$("#otherPageLink").attr( "href", "javascript:navigateToSection('about')" );
			$("#otherPageLink").html( "About Me" );
			$("#main_content").css( "opacity", "0.0" );
			$("#main_content").delay( 500 );
			$("#main_content").animate( {opacity:1.0}, 400);
			var i = $(".projectThumb").length;
			var ta= new Array();
			while( i > 0 ) {
				ta.push ( i );
				i--;
			}
			console.log( "Array: " + ta );
			$(".projectThumb").css("opacity", "0.0");
			$(".projectThumb").each( function( i ) {
				var ind = Math.floor( Math.random() * ta.length );
				var p = ta[ ind ];
				ta.splice( ind, 1 );
				$(this).delay( p * 200 + 100 );
				console.log( "array currently: " + ta );
			});
			$(".projectThumb").animate( {opacity:1.0}, 300);
			break;
	}
}







//-------- Event handlers -----------//

function onOverThumb( $thumb ) {
	var box = $thumb.children(".thumbContents").children(".captionBox");
	box.stop();
	box.css( "display", "block" );
	box.css( { height:"0px", top:"180px"} );
	box.animate( { top:154, height:26 }, 100 );
	$thumb.children(".thumbContents").children(".captionBox").children(".prompt").html("<img src='img/up_arrow.png'></img>");
}

function onOutThumb( $thumb ) {
	var box = $thumb.children(".thumbContents").children(".captionBox");
	box.stop();
	box.animate( { top:180, height:0 }, 200, function(){ box.css( "display", "none" ); }  );
	_currentThumb = -1;
}

function onClickThumb( $thumb ) {
	// Second thumb click
	if ( _currentThumb > -1 ) {
		var $d=$thumb.children( ".thumbData" );
		var $t = $d.attr( "type" );
		if (  $t == "flash" ) {
			openFlashBox( $d.children(".itemURL").html(), $d.children(".itemWidth").html(), $d.children(".itemHeight").html()  );
		} else if ( $t == "image" ) {
			openImageBox( $d.children(".itemURL").html(), $d.children(".itemWidth").html(), $d.children(".itemHeight").html()  )
		} else {
			if( _isTouch && $t == "externalFlash" ) {
				openFlashBox();
			} else {
				window.open( $d.children(".itemURL").html(), "_blank" );
			}
		} 
	
	// First Thumb Click
	} else {
		var box = $thumb.children(".thumbContents").children(".captionBox");
		box.css( "display", "block" );
		box.stop();
		box.animate( { top:0, height:180 }, 300 );
		_currentThumb = parseInt( $thumb.attr( "index" ) );
		$thumb.children(".thumbContents").children(".captionBox").children(".prompt").html("<img src='img/out_arrow.png'></img>");
	}

}