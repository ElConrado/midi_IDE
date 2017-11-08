
	var host = 'localhost'
var ws = new WebSocket('ws://' + host + ':8080');
var KeyBoard ;
var reservedHardKeys = 8;
$( document ).ready(function() {


    console.log( "ready!" );
	KeyBoard = new keyView();
	KeyBoard.addOktave();
	KeyBoard.addOktave();
	KeyBoard.addOktave();
	KeyBoard.addOktave();
	KeyBoard.addOktave();
	KeyBoard.activateTouch();
	
	
//generate samples; 


//generate samples; 
var aktion5 = new Action();
aktion5.functionHandler.push('print("6")');
aktion5.rules.push (6);
KeyBoard.KeyActionHandler.combinations.push(aktion5);


/*
Dies ist ein KeyLayout, dieses kann später durch funktionen einfach ausgetauscht werden. 
*/
var aktion = new Action();
aktion.functionHandler.push('print("0")');
aktion.rules.push(0);
KeyBoard.KeyActionHandler.combinations.push(aktion);
//generate samples; 
var aktion3 = new Action();
aktion3.functionHandler.push('print("anderes")');
aktion3.rules.push(2);
KeyBoard.KeyActionHandler.combinations.push(aktion3);
//generate samples; 
var aktion1 = new Action();
aktion1.functionHandler.push('print("1")');
aktion1.rules.push (2);
aktion1.rules.push (4);
KeyBoard.KeyActionHandler.combinations.push(aktion1);
//generate samples; 
var aktion2 = new Action();
aktion2.functionHandler.push('print("3")');
aktion2.rules.push (0);
aktion2.rules.push (4);
KeyBoard.KeyActionHandler.combinations.push(aktion2);

//generate samples; 
var aktion4 = new Action();
aktion4.functionHandler.push('print("3 finger")');
aktion4.rules.push (0);
aktion4.rules.push (6);
KeyBoard.KeyActionHandler.combinations.push(aktion4);

KeyBoard.KeyActionHandler.start();	
	    $( "#keyboardView" ).draggable({cancel: "#keyboardView *"});
		
		
		
function updateStats(memuse) {
    document.getElementById('m').innerHTML = memuse.m;
    document.getElementById('d').innerHTML = memuse.d;
	if(memuse.m.length==3){ // check if server send Junk
			KeyBoard.KeyAction(memuse.m[1],memuse.m[2]);
	}
	
}
ws.onmessage = function (event) {
	/*
	initive messages!
	*/
	var data = JSON.parse(event.data);
	if(data.command =='hardkeyset'){
		console.log(data.d[0]);
		for(var i = 0 ; i < KeyBoard.KeyMap.length && i < data.d.length; i++){
			KeyBoard.KeyText(36+i,data.d[i].functionHandler[0]);
			//KeyBoard.setAction(data.d[i]);
			//KeyBoard.KeyMap[i].action = data.d[i].func.trim();

		}
	}else if (data.command =='softkeyset') {
		console.log(data.d);
		for(var i = 0 ; i < KeyBoard.KeyMap.length; i++){
			console.log(data.d[0].settings[i].functionalName);
		KeyBoard.KeyText(36+reservedHardKeys+i,data.d[0].settings[i].functionalName.trim());
		}
	} else{
		
		updateStats(data);
	}
	
};
});
