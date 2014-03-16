

function Glitch()
{
	Glitch.prototype.GLITCH_DROPOFF = 0.8;
	this.view = new Bitmap( SREasel.prototype.instance.view );
	this.view.x = 10;
	//this.view.alpha = 0.5;
	this.view.compositeOperation = "lighter";
	SREasel.prototype.instance.stage.addChild( this.view );
	Ticker.addListener( this );
	
	this.tick = function() {
		this.view.alpha *= Glitch.prototype.GLITCH_DROPOFF;
		if ( this.alpha < 0.01 )
		{
			Ticker.removeListener( this );
			this.view.parent.removeChild( this.view );
		}
	}
	
	
}