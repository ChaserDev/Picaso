/*
*     TextManager Class
*/
function TextManager(reqLength) {
	this.stringReady = false;
	this.myString = "";
	this.targetLength = reqLength;	
}
/*
TextManager.prototype.callVariables = function() {
	alert("myString: " + this.myString + "ready: " + this.stringReady + "length: " + this.targetLength);
};*/

TextManager.prototype.fetch = function(tag) {

	$.getJSON( "http://baconipsum.com/api/?type=meat-and-filler", function(result){
	
		$.each(result, function(key, val) {		
			
			//if(this.myString.length < this.targetLength) {//THIS DOESNT WORK
				this.myString += JSON.stringify(val).substr(1,val.length - 1);
			//}
			
			console.log(this.myString.length);
		});
		console.log(this.targetLength);//THIS IS UNDEFINED
		
		//check if strings ready
		/*if(this.myString.length >=  this.targetLength) {
			this.stringReady = true;
		}
		else {
			
		}*/	
		
		
		//wanna recursively call the function if the total character requirements (targetLength)
		//is not fulfilled
	});	
};
