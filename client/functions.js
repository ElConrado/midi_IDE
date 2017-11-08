/*
globalFunctionList contains all possible functions for searching and displaying 

*/
var globalFunctionList = new Array();

 

globalFunctionList.push({name:'zoomIn','parameter':undefined});
function zoomIn(){
	KeyBoard.zoomIn();
}
globalFunctionList.push({name:'zoomOut','parameter':undefined});
function zoomOut(){
	KeyBoard.zoomOut();
}


globalFunctionList.push({name:'print','parameter':[{'name':'str','message':'Welcher String bzw. Character soll ausgegeben werden?'}]});
function print(str){
	$('#output').html($('#output').html()+str);
}

function buildFunction(name,parameter){
	var output  = '';

	/*
	find id from name
	*/
	var i = 0;
	for(var elem in globalFunctionList){
		if(globalFunctionList[elem].name == name){break;}
		i++;
		
	}
	id=i;
	console.log(i);
	//send Parameter back for dialog
	if(parameter == undefined){
		if(globalFunctionList[id].parameter != undefined){
			/*
			run prompt dialog fallback
			*/
			for(var i =0; i < globalFunctionList[id].parameter.length;i++){
				var message = globalFunctionList[id].parameter[i].message;
				var name = globalFunctionList[id].parameter[i].name;
				
				if(i != 0){
					ouput +=',"'+ prompt(message,'(' + name + ')') + '"';
				}else{
					ouput = '"' + prompt(message,'(' + name + ')')+ '"';	
				}
			}
			output =  globalFunctionList[id].name + '('+ouput+'); '; 
		}
	}
	if(output == ''){
			return output =  globalFunctionList[id].name + '(); '; 
	}
	return output;
	
}

