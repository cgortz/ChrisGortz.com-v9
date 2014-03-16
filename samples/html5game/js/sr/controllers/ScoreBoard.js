

function ScoreBoard()
{
	this.targetScore;
	this.view = new Text( "0 / 0", "20px Helvetica", "#358eb8");
	//this.view.compositeOperation = "lighter";
	
	this.setScore = function( score )
	{
		this.view.text = score + " / " + this.targetScore;
		//this.view.alpha = 0.2;
	}
	
}