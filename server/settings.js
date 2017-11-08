	var fs = require('fs');
	var path = require('path'); 


	/*
	Load hardKeys 
	IMPORTANT these key can not modifiy 
	*/
	
	
	
	/*
	@return Array({key,function})
	*/
	
	this.hardKeys = function(){
		var hardKeysFileLocation = './presets/systemKeys.hardset.config';
		if (fs.statSync(hardKeysFileLocation)) {	
			var config = new Array();
				var lines = fs.readFileSync(hardKeysFileLocation, 'utf-8').split('\n').filter(Boolean);
				for(var x in lines){
					if(lines[x].charAt(0)!='#'){
						lines[x] = lines[x].replace('\r','').replace('\t','');
						var key = lines[x].split('[')[1].split(']')[0];
						var func = lines[x].split(']')[1];
						var action = new Action;
						action.rules.push(parseInt(key));
						action.functionHandler.push(func);
						config.push(action);
					}
					
				}
		}
		return config;
	};
	/*
	This is the preset, can changed dynamicly with newPreset()
	
	see ./preset/readme.txt
	
	*/
	var presetFolder = './presets/';
	var configFiles = ['html5','css'];
	
	/*
		This returns the settings
		will saved on server for better performance when developing on a mobile device 
	*/
	this.giveSettings = function(){
		var returnPresetConfig = new Array();
		for(var i in configFiles){
			/*
			check if tag and or attributes config exists 
			*/
			var currentConfigTag = presetFolder+configFiles[i]+'.tag.config';
			var currentConfigAttribute = presetFolder+configFiles[i] + '.attributes.config';
			if (fs.statSync(currentConfigTag)) {				
				var config = new Array();
				var lines = fs.readFileSync(currentConfigTag, 'utf-8').split('\n').filter(Boolean);
				for(var x in lines){
					//goes over comments
					if(lines[x].charAt(0)!='#'){
						lines[x] = lines[x].replace('\r','').replace('\t','');
						var desc = lines[x].split('>')[1];
						var name = lines[x].split('>')[0]+'>';
						if(lines[x].indexOf('[') !=-1){
							
							var version = lines[x].split('[')[1].split(']')[0];
							//check if version is set 				
							config.push({'functionalName':name,'description':desc,'version':version});
						}else{
							config.push({'functionalName':name,'description':desc});
						}
					}
				}
				 returnPresetConfig.push({'type':configFiles[i].split('.')[0],'settings':config});
			
			}
			
			/*
			check if attributes exists
			*/
			try{
				if (fs.statSync(currentConfigAttribute)) {
				
				}
			}
			catch(e){
				
			}
		}
		return returnPresetConfig;
	};
	
	
	
	/*
Model für Actions 
*/

function Action(){
	this.functionHandler = new Array(); // Array for multiple Functions 
	
	this.rules = new Array(); //stores the KeyObjects if all fits this functionHandler will run  
	this.moveActions = function(value){
		for(var i = 0 ; i < this.rules.length;i++){
			this.rules[i]+=value;
		}
	}
	//TODO Enable silent mode (parameter)
	this.aktionBuilder = function(){
		var CountOfKeys = prompt('Wie viele Tasten werden gleichzeitig gedrückt?','');
		for(var i = 0;i<CountOfKeys;i++){
			this.rules.push(prompt('Welche Taste?','')); // TODO Injecte in den Recorder und warte auf die Taste
		}
		
		var selectedFunction = prompt('Welche Funktion soll ausgeführ werden?','');
		this.functionHandler.push(buildFunction(selectedFunction));
		return JSON.stringify(this);
	}
}