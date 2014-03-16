
function SREasel( canvas ) //pass in a canvas
{
	
	SREasel.prototype.instance = this;

	this.stage = new Stage( canvas );
	
	var background = new Bitmap( bgImage );
	background.alpha = 0.2;
	this.stage.addChild( background );
	this.stage.mouseEventsEnabled = true;
	this.stage.autoClear = false;

	Ticker.setFPS( 60 );
	Ticker.addListener( this );

	this.tick = function (){
		this.stage.update();
	}

}