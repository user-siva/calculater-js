function getHistory(){
	return document.getElementById('history-value').innerText;
}

function printHistory(num) {
	document.getElementById('history-value').innerText = num;
}

function getOutput() {
	return document.getElementById('output-value').innerText;
}

function printOutput(num) {
	if(num=='') {
		document.getElementById('output-value').innerText = num;
	}
	else {
		document.getElementById('output-value').innerText=formattedNum(num);
	}
}

function formattedNum(num) {
	if (num == '-') {
		return '';
	}
	var n = Number(num);
	var value = n.toLocaleString('en');
	return value;
}

function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName('operator');
for(var i=0;i<operator.length;i++) {
	operator[i].addEventListener('click',function(){
		if(this.id == 'clear') {
			printOutput('');
			printHistory('');
		}
		else if(this.id=='backspace') {
			var output = reverseNumberFormat(getOutput()).toString();
			if(output) {
				value = output.substr(0,output.length-1);
				printOutput(value);
			}
		}
		else {
			var output = getOutput();
			var history = getHistory();
			if(output==''&&history!='') {
				if(isNaN(history[history.length-1])){
					history = history.substr(0,history.length-1);
				}
			}
			if(output!=='' || history!='') {
				//condition?True:False
				output = output==''?output:reverseNumberFormat(output);
				history = history + output;
				if (this.id == "=") {
					var value = eval(history);
					printOutput(value);
					printHistory('');
				}
				else {
					history = history + this.id;
					printHistory(history);
					printOutput('');
				}

			}
		}
	}

);
}

var number = document.getElementsByClassName('number');
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printOutput(output);
		}
	}
);
}

var microphone = document.getElementById('microphone');
microphone.onclick = function() {
	microphone.classList.add('record');
	var recognition = new (window.SpeechRecognition|| window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	recognition.lang ='en-US';
	recognition.start();
	a={
		'plus':'+',
		'minus':'-',
		'multiply':'*',
		'multiplied by':'*',
		'divide':'/',
		'divided by':'/',
		'remainder':'%',
	}
	recognition.onresult = function(event) {
		var input = event.results[0][0].transcript;
		for(b in a) {
			input=input.replace(b,a[b]);
		}
		document.getElementById('output-value').innerText = input;
		setTimeout(function(){evalute(input);},2000);
	}
	function evalute(input) {
		try{
			var result = eval(input);
			document.getElementById('output-value').innerText = result;
		}
		catch(e) {
			console.log(e);
			document.getElementById('output-value').innerText = '';
		}
	}
}
































