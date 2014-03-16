var isTouch = false;

$(document).ready( function(){
		
		isTouch = !!('ontouchstart' in window);
		
		for ( var i = 1; i < 9; ++i )
		{
			var newImage = new Image();
			newImage.src = "images/digits/" + i + ".png";
			digitImages.push( newImage );
		} 
		bgImage.src = "images/background.jpg";
		easel = new SREasel( document.getElementById( "easel" ) );
		setTimeout( showGameView, 500);
		
	});


function showGameView()
{
	var gv = new GameView();
	//var b = new Block( 1 );
	easel.stage.addChild( gv.view );
	gv.stageRef = easel.stage;
	
}