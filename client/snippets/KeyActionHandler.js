/*
This Handler is for the KeyAction


*/
var FUNCTIONTOPUSH = new Array();
function KeyAction(){
	this.combinations = new Array();
	this.pressedKeys = new Array();
	
	this.combinationPress; // interval für Flush des Keypools (geschlagener Ton ist gespielt... geschwindigkeit kann angepasst werden)
	var LastActionID = 0;
	this.press = function(Key,velocity){
		
		if(velocity <= KEYBOARDVELOCITY ){
			Key.stop();
			var index = this.pressedKeys.indexOf(Key);
			if (index > -1) {
				this.pressedKeys.splice(index, 1);
			}
			$(Key.DOM).removeAttr('style');
			if(typeof(Key.action) != 'undefined'){
				eval(Key.action+'("up");');
			}
			

		}else{
			Key.start();
			if(this.pressedKeys.indexOf(Key)==-1){
			this.pressedKeys.push(Key);
			}

			$(Key.DOM).css('background-color','rgba(255,0,0,0.4)');
			if(typeof(Key.action) != 'undefined'){
				eval(Key.action+'("down");');
			}
		}
	}
this.start = function(){
	setInterval(this.buildAction,65);
	setInterval(this.performAction,65);
}

/*
This will load the actions to our cache 
*/
	this.buildAction = function(){
		if(KeyBoard.KeyActionHandler.pressedKeys.length == 0 ) return;
		var actionArray = new Array; //Combine actions 
		for(var i = 0; i < KeyBoard.KeyActionHandler.pressedKeys.length; i++){
			if(delayToMultiKey <= KeyBoard.KeyActionHandler.pressedKeys[i].getTime()){
				actionArray.push(KeyBoard.KeyActionHandler.pressedKeys[i]);// 
			}else{		
				//wait for delay 
				return;
			}		
		}
		//perform combination keypress
		if(actionArray.length == KeyBoard.KeyActionHandler.pressedKeys.length){
			getCombination(actionArray);
			//console.log(actionArray);
		}
	}
	//Map Keys to Combinations
	function getCombination(actions){
		if(KeyBoard.KeyActionHandler.combinations.length == 0){
			//no run 
			return ;
		}
		else{

			for(var i = 0; i< KeyBoard.KeyActionHandler.combinations.length ; i++){
				var matched = 0;
				for(var KeyCounter = 0; KeyCounter< actions.length ; KeyCounter++){
					console.log(KeyBoard.KeyActionHandler.combinations[i].rules);
						if(KeyBoard.KeyActionHandler.combinations[i].rules.indexOf(actions[KeyCounter].id) != -1){
							matched++;
						}
				}
				console.log(matched,KeyBoard.KeyActionHandler.combinations[i].rules.length);
				if(matched >= KeyBoard.KeyActionHandler.combinations[i].rules.length){

					//Found first possible, check if multikey is pressed...
					FUNCTIONTOPUSH =KeyBoard.KeyActionHandler.combinations[i].functionHandler;
					console.log(FUNCTIONTOPUSH);
					
				}else if(matched != 0){
					var COPY_ofCombinations = JSON.parse(JSON.stringify(KeyBoard.KeyActionHandler.combinations[i])); 

					for(var KeyCounter = 0; KeyCounter< actions.length ; KeyCounter++){
						var index = COPY_ofCombinations.rules.indexOf(actions[KeyCounter].id);
							if (index > -1) {
								COPY_ofCombinations.rules.splice(index, 1);
							}
						}

						//Now show Possible Keys with new text 
						for(var selectDom =0;selectDom < COPY_ofCombinations.rules.length;selectDom++){
							//Group Length
							//Read out rgba color value /12 and see if it is shorter, when it is don't show 
							$(KeyBoard.KeyMap[COPY_ofCombinations.rules[selectDom]].DOM).css('background-color','rgba('+ 12*COPY_ofCombinations.rules.length +','+ 3*COPY_ofCombinations.rules.length +',0,0.4)');
						}
					}
				
			}
			var combinedAction ='';
			
		}
	}
	/*
	Run our Action and Flush
	*/
	this.performAction = function(){
		if(KeyBoard.KeyActionHandler.pressedKeys == 0 && FUNCTIONTOPUSH.length){
			for(var i = 0; i< KeyBoard.KeyMap.length;i++){
				$(KeyBoard.KeyMap[i].DOM).removeAttr('style');
			}
			for(var count = 0 ; count < FUNCTIONTOPUSH.length; count++){
				eval(FUNCTIONTOPUSH[count]);
			}
			FUNCTIONTOPUSH = new Array(); // Don't destroy, it is in a global loop
		}		
	}
}

/*
defines each Key 
*/
var delayToMultiKey = 0; //ms 
var KEYBOARDVELOCITY = 10;

function KeyClass(){
	//identifer
	this.id;
	this.DOM;
	//Statistic
	var time=0;
	//functions
	this.pressDown;
	this.pressUp;
	var timeout = null;
	this.start = function(){
		if(timeout == null){
			timeout = setInterval(countTime,1);
		}
	}
	
	function countTime(){
		time +=1;
	}
	this.stop = function(){
		clearTimeout(timeout);
		time = 0;
		timeout = null;
	}
	this.getTime =  function(){
		return time;
	}
}
/*
Model für Actions 
*/

function Action(action){
	this.rules = new Array();
	this.functionHandler = new Array();
	if(action!= undefined){
		if(action.rules != undefined){
				this.rules = rules; //stores the KeyObjects if all fits this functionHandler will run  
		}
		if(action.functionHandler != undefined){
			this.functionHandler = functionHandler; // Array for multiple Functions 
		}
	}
	this.moveActions = function(value){
		for(var i = 0 ; i < this.rules.length;i++){
			this.rules[i]+=value;
		}
	}
	//TODO Enable silent mode (parameter)
	this.aktionBuilder = function(){
		/*
		recordMode 
		*/
		var CountOfKeys = prompt('Wie viele Tasten werden gleichzeitig gedrückt?','');
		for(var i = 0;i<CountOfKeys;i++){
			this.rules.push(prompt('Welche Taste?','')); // TODO Injecte in den Recorder und warte auf die Taste
		}
		
		var selectedFunction = prompt('Welche Funktion soll ausgeführ werden?','');
		this.functionHandler.push(buildFunction(selectedFunction));
		return JSON.stringify(this);
	}
}