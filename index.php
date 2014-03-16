<!DOCTYPE html>


	<?php
		 $xmlFile = simplexml_load_file("data/data.xml");
    ?>


<html>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Chris Gortz</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="css/normalize.min.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
        
    </head>
    <body>

		<div class="page">

			<div class="header">
				<h1 id="chris_gortz">Chris Gortz</h1>
				<p>Interactive Developer</p>
				
				<div class="headButtonBox"><a id="otherPageLink" href="javascript:navigateToSection('about')">About Me</a> | <a href="mailto:cg@chrisgortz.com">Email</a></div>
				
				
			</div>
			

	<div id="main_content">
			
				<?php
		        	$nodes = $xmlFile->work->item;
		        	
		       		$cur = 0;
		        	foreach ($nodes as $node) 
		        	{ 
		        		echo "<div class='projectThumb' index='".$cur."'>
		        			<div class='thumbContents'>
		        				<img src='".$node->thumb."'></img>
		        				<div class='captionBox'>
		        					<div class='captionText'>".$node->name."<p>".$node->description."</p></div>
		        					<div class='prompt'></div>
		        				</div>	
		        			</div>
		        			<div class='thumbData' type='".$node->attributes()->type."'>
		        				<div class='itemWidth'>".$node->attributes()->width."</div>
		        				<div class='itemHeight'>".$node->attributes()->height."</div>
		        				<div class='itemURL'>".$node->link."</div>
		        			</div>
		        		</div>"; 
		        		++$cur;
		        	};
				?>
				

			</div>
			
			<div id="about_page">
				<h2><? echo $xmlFile->about->head; ?></h2>
				<p><? echo $xmlFile->about->body; ?></p>
			</div>
			
			<div id="light_box">
				<div id="light_box_content">
					<div id="flashContent"><h2><font color='white'><img src="img/sorry.png" width=214 height=129></img><br>To view Flash content, please visit this site on a standard desktop browser.</font></h2></div>
					<div id="imageContent"><img></img></div>
				</div>
			</div>
			
			<div class="footer">email: <a href="mailto:cg@chrisgortz.com">cg@chrisgortz.com</a></div>
			
		</div>

        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.3.min.js"><\/script>')</script>

        <script src="js/plugins.js"></script>
        <script src="js/vendor/jquery.history.js"></script>
        <script src="js/main.js"></script>
		<script type="text/javascript" src="js/vendor/swfobject.js"></script>
		

        

<!--
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
-->
    </body>
</html>
