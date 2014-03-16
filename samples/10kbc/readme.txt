CHARGE OF THE HERO
VERSION 1 (Leaderbards Disabled)
LOCALIZATION INSRUCTIONS



Localization of this version of the game only requires updating the text fields (static text and buttons) that appear on screen. 
The vendor has supplied Warner Brothers with a breakdown of all of the text used in the game in English.
For the most part, translating this text and updating it in the corresponding fields in the XML document (xml.xml) is all that is required.

The one complicating factor is the alignment of the title. Because the title page has been designed with the words "CHARGE OF THE" fully justified
above the word "HERO", some extra tools have been built into the flash movie to help control the alignment. Below is an exerpt from the portion
of the XML document that feeds the title page.

		  <type>CHARGE  OF  THE</type>
		  <size>25</size>
		  <hAlign>0</hAlign>
		  <type>HERO</type>
		  <size>79</size>
		  <type>PLAY GAME</type>
		  <type>Copyright 2008 Warner Bros. Ent. All rights reserved</type>
		  
The second node, "size", enables administrators to control the point size of the top line of the game title. In countries where the translated 
version of "CHARGE OF THE" requires more characters than the English version, administrators might want to consider reducing the point size of 
the text to make sure it aligns properly above the word "HERO".

The fifth node, also labeled "size", offers similar control over the point size of the second line. Reduction of point size using this field 
should be used sparingly, however, as the letter spacing changes along with the point size, and drastic changes can further complicate relationship 
between the first and second lines of text. 

Of course, administrators may also want to change the alignment of the entire logo for aesthetic reasons as the number of characters used in each
country changes, which is why the third node, "hAlign", has been included. Increasing or decreasing the hAlign value changes the horizontal location 
of the entire logo on the page. If six characters are required instead of four, and administrator can try to keep text from running off the right 
side of the page by entering a hAlign value of -50, thus moving the entire logo 50 pixels to the left of its default location.