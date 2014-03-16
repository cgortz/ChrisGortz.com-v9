
function Block( id, img ) {
	
	this.index = id;
	this.image = img;
	this.view;
	this.column;
	this.row;
	this.name = "block" + id;
	
	var selfRef = this;
	var baseX;
	var baseY;
	var mod;

	if ( id == 0 )
	{
		this.view = new Object();
	} else {
		this.view = new Bitmap( img );
		this.view.onClick = function( event )
		{
			GameView.prototype.instance.onBlockClick( event.target.controller );
			//GameView.prototype.instance.onBlockClick( event.target.controller.index );
		}
	}
	this.view.scaleX = 0.05;
	this.view.scaleY = 0.05;
	this.view.visible = false;
	
	this.scaleIn = function()
	{
		selfRef.view.visible = true;
		mod = 1;
		baseX = selfRef.view.x;
		baseY = selfRef.view.y;
		Ticker.addListener( selfRef );
	}
	
	setTimeout( this.scaleIn, this.index * 70 + 100  );
	
	this.view.controller = this;
	
	this.tick = function() {
		mod *= 0.8;
		this.view.scaleY = this.view.scaleX = 1 - mod;
		this.view.x = baseX + mod * 20;
		this.view.y = baseY + mod * 20;
		if ( this.view.scaleX >= 0.99 )
		{
			this.view.scaleX = this.view.scaleY = 1.0;
			Ticker.removeListener( this );
			//this.view.parent.removeChild( this.view );
		}
	}
	
	
}