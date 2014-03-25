// TIM OWNER

//converts a string to all lowercase and strips spaces and punctuation
function appendToStringArray(string, tag) {

//stub string/*
var tempString = "";


$.getJSON( "http://baconipsum.com/api/?type=meat-and-filler", function(result){
	
		$.each(result, function(key, val) {
			tempString += (val);
		});
		
		//convert to lowercase
		tempString = tempString.toLowerCase();

		//string that holds only the characters from the stubstring
		var outputString = '';

		for (var i = 0; i < stubString.length; i++)
		{
			var upperCaseChar = tempString.charAt(i).toUpperCase();
			var lowerCaseChar = tempString.charAt(i);
		
			//compare the two chars, if they are different it is a character
			if(upperCaseChar != lowerCaseChar)	
			{
				string += string.concat(lowerCaseChar);
			}	
		}	
	});	
}

