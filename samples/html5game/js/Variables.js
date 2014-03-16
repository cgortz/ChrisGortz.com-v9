// Global Vars ---------------------------- //

var testGrid;
var easel;
var bgImage = new Image();
var digitImages = new Array();
var blocks = new Array();
var gridModel;




// Assets --------------------------------- //

for ( var i = 0; i < 16; ++i )
{
	var img = new Image();
	img.src = "images/digits/" + ( i + 1 ) + ".png";
	digitImages.push( img );
	console.log( "block: " + digitImages[ i ] );
}