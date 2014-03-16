function GameView() {
	
	// Set vars ======================================//
	
	GameView.prototype.instance = this;
	GameView.prototype.mouseOn = true;
	this.view = new Container();
	this.stageRef;
	
	var grid = new BlockGrid( 4, 4 );
	var scoreboard = new ScoreBoard();
	var glitch;
	var selfReference = this;
	
	
	
	// Initialize ====================================//
	
	grid.view.x = 250;
	grid.view.y = 130;
	grid.view.alpha = 0.3;
	grid.view.compositeOperation = "lighter";
	
	scoreboard.view.x = 400 - 20;
	scoreboard.view.y = 500;
	scoreboard.targetScore = grid.model.totalBlocks - 1;
	scoreboard.setScore( grid.model.totalBlocks - 1 );
	//scoreboard.view.compositeOperation = "lighter";
	this.view.addChild( scoreboard.view );

	this.view.addChild( grid.view );

	this.view.name = "GameView;"
	
	
	
	
	var startNewGame = function( )
	{
		console.log( "this = " + selfReference );
		grid.randomize();
		scoreboard.setScore( selfReference.checkScore() );
	}
	
	this.onBlockClick = function( blockObj )
	{
		if ( !GameView.prototype.mouseOn )
		{
			return;
		}
		//console.log( "On Block Click " + blockObj.column + ", " + blockObj.row );
		var emptyBlock = grid.model.getEmptyBlock();
		if( grid.checkAdjacent( blockObj ) )
		{
			grid.moveBlockToCoordinates( blockObj, emptyBlock.column, emptyBlock.row, 0, this.moveComplete ); 
			grid.model.swapBlocks( emptyBlock, blockObj );
			GameView.prototype.mouseOn = false;
		}
		
		
		console.log( "score: " + this.checkScore() );
		scoreboard.setScore( this.checkScore() );
		//glitch = new Glitch();
		//this.view.addChild( glitch.view );
	}
	
	this.checkScore = function()
	{
		var score = 0;
		for( var i = 0; i < grid.model.rows; ++i )
		{
			for( var j = 0; j < grid.model.columns; ++j )
			{
				var block = grid.model.getBlockAt( j, i );
				//console.log( "comparing " + ( block.index ) + ", and " + ( grid.model.columns * i + j + 1 ) );
				if ( block.index == grid.model.columns * i + j + 1 )
				{
					++score;
				}
			}
		}
		return score;
	} 
	
	
	this.moveComplete = function()
	{
		GameView.prototype.mouseOn = true;
	}
	
	Ticker.addListener( this );
	
	this.tick = function() {
		if ( !isTouch ) GameView.prototype.instance.view.alpha = Math.random() * 0.4 + 0.6;
	}

	setTimeout( startNewGame, 1500 );
	
}