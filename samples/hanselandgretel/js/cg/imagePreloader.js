
function ImagePreloader( delegateScope ) 
{
	if (jQuery == null) {  
		console.log( "WARNING: ImagePreloader can't function without jQuery." );
		return;
	} 
	var obj = new Object();
	obj.imagesTotal = 0;
	obj.imagesLoaded = 0;
	obj.imageArray = new Array();
	obj.delegate;
	if( delegateScope != null )
	{
		obj.delegate = delegateScope;
	}
	
	
	
	obj.add = function( imageURL, imageName, element )
	{
		obj.imagesTotal ++;
		var o = new Object();
		o.image = new Image();
		o.path = imageURL;
		o.name = imageName;
		o.element = element;
		o.image.onload = function(){
	        obj.imagesLoaded = obj.imagesLoaded + 1;
	        var element = obj.getElementBySource( this.src );
	        if ( element )
	        {
	        	element.src = this;
	        }
			if ( obj.delegate != null )
			{
				if ( obj.delegate.onImageLoaded == undefined )
				{
					console.log( "WARNING: ImagePeloader delegate needs to have an 'onImageLoaded' method" );
				} else {
					obj.delegate.onImageLoaded();
				}
			}
	    }
	    obj.imageArray.push( o );
	}
	
	
	
	obj.load = function() 
	{
		for( var i = 0; i < obj.imageArray.length; ++i )
		{
			var o = obj.imageArray[ i ];
			o.image.src = o.path;
		}
	}
	
	
	
	obj.getElementBySource = function( sourceURL )
	{
		for( var i = 0; i < obj.imageArray.length; ++i )
		{
			if( sourceURL == obj.imageArray[ i ].path )
			{
				return obj.imageArray[ i ].element;
			}
		}
		console.log( "No image element associated with " + sourceURL +". Continuing script." );
		return null;
	}

	
	return obj;

}
