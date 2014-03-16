function GridModel( cols, rows )
{
	
	this.array = new Array();
	this.columns = cols;
	this.rows = rows;
	this.emptyBlock;
	this.totalBlocks = cols * rows;
	
	for( var i = 0; i < rows; ++i )
	{
		this.array.push( new Array() );
	}
	
	this.setBlockAt = function( col, row, block )
	{
		if ( col >= this.columns || row >= this.rows )
		{
			colsole.log( "WARNING: Tried to set a block outside of GridModel bounds" );
			return;
		}
		this.array[ row ][ col ] = block;
		block.column = col;
		block.row = row;
		//console.log( "set block: " + this.array[ row ][ col ].name );
		//console.log( "assigned row " + this.array[ row ][ col ].row );
	}
	
	this.getBlockAt = function( col, row )
	{
		return this.array[ row ][ col ];
	}
	
	this.getEmptyBlock = function()
	{
		//return this.array[ this.rows - 1 ][ this.columns - 1 ];
		return this.emptyBlock;
	}
	
	this.swapBlocks = function ( block1, block2 )
	{
		
		var coords1 = { x:block1.column, y:block1.row };
		var coords2 = { x:block2.column, y:block2.row };
	
		this.setBlockAt( coords1.x, coords1.y, block2 );
		this.setBlockAt( coords2.x, coords2.y, block1 );
		//console.log( "swapping blocks " + block1.name + ", " + block1.column + ", " + block1.row );
	}
	
}