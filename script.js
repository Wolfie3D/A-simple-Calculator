// Define function to get the value of the history element
function getHistory(){
	return document.getElementById("history-value").innerText;
}

// Define function to set the value of the history element
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}

// Define function to get the value of the output element
function getOutput(){
	return document.getElementById("output-value").innerText;
}

// Define function to set the value of the output element, with formatting
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}

// Define function to format a number with commas
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}

// Define function to remove commas from a number
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

// Add event listeners to operator buttons
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		// If clear button is clicked, clear history and output
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		// If backspace button is clicked, remove last character from output
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			// Get current output and history values
			var output=getOutput();
			var history=getHistory();
			// If output is empty but history is not, check if last character of history is an operator and remove it
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			// If output or history have values, update history and output based on the operator button that was clicked
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					// If equals button is clicked, evaluate the history string and set output to the result
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					// Otherwise, add the operator button clicked to the history string and clear the output
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}

// Add event listeners to number buttons
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		// If a number button is clicked, add the number to the output
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printOutput(output);
		}
	});
}
