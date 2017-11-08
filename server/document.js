/*
this Object will store the document 



Remember Tag is not equal with Element

Tag can also be a css value or a "HTML-Attribute"
<div class="testClass" style="margin:50px 50px 50px 50px"></div>

<tag tag="attribute" tag="tag:attribute attribute attribute attribute"></tag>

what ever the Tag Object is pointing to





Example of a HTML element 
source.push({'children':new Array(),'tag':'div','attributes':[{'tag':'style','attributes':[{'tag':'margin','attributes':'10px'}]},{'tag':'class','attributes':[{'tag':'CSSClass','attributes':''}]}]})

source[0].children = new Array(); 
output: <div style="margin:10px" class="CSSClass"></div>

source[0].children.push({'children':new Array(),'tag':'div','attributes':[{'tag':'style','attributes':[{'tag':'margin','attributes':'10px'}]}]})
output: <div style="margin:10px" class="CSSClass"><div style="margin:10px"></div></div>

*/

function document(){
	// the source will be stored in an Array with Tag Objects
	this.source = new Array();
	
	var selectedElement; 
	var selectedPosition = '[0]'; // this is an string like [0][1][2] makes a lot easier to navigate 
	
	/*
	this will append an Tag into the selected Element
	*/
	this.appendTag = function(){
		
	};
	/*
	this will append an Attribute into a Tag
	*/
	this.appendAttribute = function(tag){
		
	};
	/*
	Move Next 
	*/
	this.next = function(){
		var index =selectedPosition.charAt(selectedPosition.length-2);
		index ++; // don't use += 1 provide string addion
		selectedPosition = setCharAt(selectedPosition,selectedPosition.length-2,index);
		selectedElement = eval(this.source+selectedPosition);
	};
	/*
	Move Before 
	if before first element unshift a tag
	*/
	this.before = function(){
		var index =selectedPosition.charAt(selectedPosition.length-2);
		index --; // don't use += 1 provide string addion
		if(index <= -1){
			selectedElement = eval(this.source+selectedPosition+'.unshift()');
		}else{
			selectedPosition = setCharAt(selectedPosition,selectedPosition.length-2,index);
			selectedElement = eval(this.source+selectedPosition);
		}
	};
	/*
	Move Up
	*/
	this.up = function(){
		
	};
	/*
	Move Down
	*/
	this.up = function(){
		
	};
	/*
	this will push the document into vaild HTML 
	@return String or JSON 
	*/
	this.exportDocument = function(wantJSON){
		
	};

	function setCharAt(str,index,chr) {
		if(index > str.length-1) return str;
		return str.substr(0,index) + chr + str.substr(index+1);
	}	
	
	
}