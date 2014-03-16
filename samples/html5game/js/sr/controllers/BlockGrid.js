
function BlockGrid( cols, rows ) {
	
	BlockGrid.prototype.BLOCK_SPACING = 80;
	BlockGrid.prototype.instance = this;
	
	this.view = new Container();
	this.view.name = "BlockGrid";
	
	this.model = new GridModel( cols, rows );
	
	var tweenArray;
	var randomizeInterval;
	
	for( var i = 0; i < rows; ++i )
	{
		for ( var j = 0; j < cols; ++j )
		{
			var nextBlock;
			if ( i * cols + j < cols * rows - 1 )
			{
 				nextBlock = new Block( ( i * cols + j + 1), digitImages[ i * cols + j ] ); 
				nextBlock.view.x = j * BlockGrid.prototype.BLOCK_SPACING + 1;
				nextBlock.view.y = i * BlockGrid.prototype.BLOCK_SPACING +  1;
				this.view.addChild( nextBlock.view );
				
			} else {
				// Create an empty block
			 	nextBlock = new Block( 0, null );
				this.model.emptyBlock = nextBlock;
			}
			this.model.setBlockAt( j, i, nextBlock );
		}
	}
	
	this.randomize = function( steps )
	{
		console.log( "Go Randomization!");
		if ( steps == null )
		{
			steps = this.model.columns * 8;
		}
		tweenArray = new Array();
		var lastPick;
		for ( var i = 0; i < steps; ++ i )
		{
			var adjacents = new Array();
			for( var j = 0; j < this.model.rows; ++j )
			{
				for ( var k = 0; k < this.model.columns; ++k )
				{
					var blockToCheck = this.model.getBlockAt( k, j );
					if ( this.checkAdjacent( blockToCheck ) && lastPick != blockToCheck )
					{
						adjacents.push( blockToCheck );
					}
				}
			}
			var nextPick = adjacents[ Math.floor( Math.random() * adjacents.length ) ];
			tweenArray.push( { block:nextPick, x:this.model.emptyBlock.column, y:this.model.emptyBlock.row } );
			//console.log( "Adding this to array: " + tweenArray[ tweenArray.length - 1 ].block.name + ", "+ tweenArray[ tweenArray.length - 1 ].x + ", " + tweenArray[ tweenArray.length - 1 ].y );
			//this.moveBlockToCoordinates( nextPick, this.model.emptyBlock.column, this.model.emptyBlock.row, i * 250 );
			this.model.swapBlocks( nextPick, this.model.emptyBlock );
			lastPick = nextPick;
		}
		this.cycleTweens( this );
	}
	
	this.cycleTweens = function( callingObject ) 
	{
		if ( tweenArray.length == 0 )
		{
			return;
		}
		var nextTween = tweenArray[ 0 ];
		tweenArray.splice( 0, 1 );
		//console.log( "Pulling this from array: " + nextTween.block.name + ", "+ nextTween.x + ", " +nextTween.y );
		//console.log( "Pulling this from array: " + nextTween.block + ", "+ nextTween.x + ", " +nextTween.y );
		this.moveBlockToCoordinates( nextTween.block, nextTween.x, nextTween.y, 0 );
		setTimeout( function() { callingObject.cycleTweens( callingObject ) }, 150 );
	}
	
	this.moveBlockToCoordinates = function( blockObj, xCoord, yCoord, delay, callback )
	{
		var targX = xCoord * BlockGrid.prototype.BLOCK_SPACING;
		var targY = yCoord * BlockGrid.prototype.BLOCK_SPACING;
		//console.log( "Moving to " + targX + ", " + targY );
		if ( delay == null || delay == 0 )
		{
			delay = 150;
		}
		if ( callback != null && callback != undefined )
		{
			var tempTween = Tween.get(blockObj.view).to({x:targX, y:targY},150).wait(delay).call(callback);
		} else {
			var tempTween = Tween.get(blockObj.view).to({x:targX, y:targY},150).wait(delay);
		}
	}

	
	this.checkAdjacent = function( blockObj )
	{
		var adjacents = 0;
		var emptyBlock = this.model.getEmptyBlock();
		adjacents += Math.abs( blockObj.row - emptyBlock.row );
		adjacents += Math.abs( blockObj.column - emptyBlock.column);
		//console.log( "total adjacent points = " + adjacents );
		if ( adjacents == 1 )
		{
			return true;
		} else {
			return false;
		}
	}

}

