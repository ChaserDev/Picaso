// TIM OWNER

//converts a string to all lowercase and strips spaces and punctuation
function convertString() {

//stub string/*
var stubString = "";


$.getJSON( "http://baconipsum.com/api/?type=meat-and-filler", function(result){
	
		$.each(result, function(key, val) {
			stubString += (val);
		});
		
		//convert to lowercase
		stubString = stubString.toLowerCase();

		//string that holds only the characters from the stubstring
		var outputString = '';

		for (var i = 0; i < stubString.length; i++)
		{
			var upperCaseChar = stubString.charAt(i).toUpperCase();
			var lowerCaseChar = stubString.charAt(i);
		
			//compare the two chars, if they are different it is a character
			if(upperCaseChar != lowerCaseChar)	
			{
				outputString += lowerCaseChar;
			}	
		}	
		
		return outputString;
	});	
}

