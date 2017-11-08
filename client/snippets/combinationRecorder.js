/*
Diese Klasse dient der Zuweisung von Befehlen für die jeweiligen Tastenkombinationen


*/

function combinationRecorder(){
	//init config
	var run = false;
	
	//init values
	var combiations = new Array();
	var action = ''; 
	this.keyList = new Array();
	this.action = function(e){
		eval(e);
		
	};
	
}