
function keyView(){
	var Oktave	= {"<>":"div","id":"oktave_${OktavenCounter}",'class':'oktave',"html":[]};
var KeyJSON =  [{"<>":"div","id":"c","html":" "}, {"<>":"div","class":"black","id":"c#","html":" "}, {"<>":"div","id":"d","html":" "}, {"<>":"div","class":"black","id":"d#","html":" "}, {"<>":"div","id":"e","html":" "}, {"<>":"div","id":"f","html":" "}, {"<>":"div","class":"black","id":"f#","html":" "}, {"<>":"div","id":"g","html":" "}, {"<>":"div","class":"black","id":"g#","html":" "}, {"<>":"div","id":"a","html":" "}, {"<>":"div","class":"black","id":"a#","html":" "}, {"<>":"div","id":"h","html":" "} ];
	var STYLE = '<style> .oktave{ width:20%; position:relative;  height:100%; display:inline-block; } .oktave div{ display:inline-block; border:1px solid black; position:relative; height:100%; width:13%; margin:4px; } .black{ position: absolute !important; background-color: black; height: 60% !important; margin: -4% !important; top: 9%; width: 8% !important; } </style>';
	
	//init Keyboard
			$('body').append(STYLE);
			
	//init KeyAction
	this.KeyActionHandler = new KeyAction;

$('body').append('	<style> .KeyText{display: table-row; position: absolute;  top: 65%; color: red; text-align: center; width: 100%;}#keyboardView{padding: 30px; border:1px solid gray;position:absolute; top:20%;display:inline-block; -moz-transform: scale(0.8, 0.8); /* Moz-browsers */ zoom: 0.8; /* Other non-webkit browsers */ zoom: 50%; /* Webkit browsers */ height:400px; width:4000px; } </style><div id="keyboardView"></div>');
	this.record = true;
	this.recoder = new combinationRecorder();
	var OktavenCounter = 0;
	var startKeyNumber =36;
	this.KeyMap = [];
	this.addOktave = function(){
		$('#keyboardView').append(json2html.transform({'OktavenCounter':OktavenCounter}, Oktave ));
		$('#oktave_'+OktavenCounter).append(json2html.transform({}, KeyJSON ));
		console.log(json2html.transform({}, KeyJSON ));
		for(var i = 0;i<$('#oktave_'+OktavenCounter).children().length;i++){
			var key = new KeyClass();
			key.DOM  = $('#oktave_'+OktavenCounter).children()[i];
			key.id = (OktavenCounter*12) + i;
			
		this.KeyMap.push(key);
		}
		OktavenCounter++;
	}
	this.activateTouch = function(){
		for(var i = 0;i<this.KeyMap.length-1;i++){
			console.log(i);
			$(KeyBoard.KeyMap[i].DOM).attr('data-KeyMapId',i);
			$(KeyBoard.KeyMap[i].DOM).mousedown(function(e){
				console.log((parseInt($(e.target).attr('data-KeyMapId'))));
				KeyBoard.KeyActionHandler.press(KeyBoard.KeyMap[(parseInt($(e.target).attr('data-KeyMapId')))],144);
				});
			$(KeyBoard.KeyMap[i].DOM).mouseup(function(e){
				KeyBoard.KeyActionHandler.press(KeyBoard.KeyMap[(parseInt($(e.target).attr('data-KeyMapId')))],0);
				});
		}
	}
	this.zoomOut = function(){
		$('#keyboardView').css('zoom',parseFloat($('#keyboardView').css('zoom'))-0.1);
	}
	this.zoomIn = function(){
		$('#keyboardView').css('zoom',parseFloat($('#keyboardView').css('zoom'))+0.1);
	}
	
	this.setAction = function(action){
		//check for Conflicts ask for merge or resolve
		KeyBoard.KeyActionHandler.combinations.push(action);
					KeyBoard.KeyActionHandler.combinations.sort(function(a,b) {    return a.rules.length > b.rules.length;});

	}
	/*
	
	here is the recorder injection
	*/
	this.KeyAction = function(Key,velocity){
		for(var i = 0; i < this.KeyMap.length;i++){
			if(this.KeyMap[i].id == (Key-startKeyNumber)){
				this.KeyActionHandler.press(this.KeyMap[i],velocity);
			}
		}
		
		
		if(this.record == true){
			this.recoder.keyList.push(Key);
		}
	}
	this.KeyText = function(keyID,Text){
		if(this.KeyMap[keyID-startKeyNumber] != undefined)
		{
		if($(this.KeyMap[keyID-startKeyNumber].DOM).children().length == 0){
			$(this.KeyMap[keyID-startKeyNumber].DOM).append('<span class="KeyText">'+htmlEscape(Text)+'</span>');
		}else{
			$($(this.KeyMap[keyID-startKeyNumber].DOM).children()[0]).text(Text);
		}
		}
	}
	function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
}

//KeyObject 
function Key(){
	//identifer
	this.id;
	this.DOM;
	//Statistic
	this.isPressed;
	this.time;
	
	//functions
	this.pressDown;
	this.pressUp;
}


