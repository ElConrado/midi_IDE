function WebEditor(){
	this.DOM = $('body').append('<div id="editor" class="EditorPreview"></div>');
	this.NodeTree = new Array();
	this.depth = new Array(); // An Array used as a Pointer to show to selected element from NodeTree useage: [0,1,2,3,4] -> NodeTree[0][1][2][3][4]
	this.addHTMLElement= function(elem){
		if(selectedNode() != undefined){
			selectedNode().push(elem);
		}else{
			this.NodeTree = new Array();
			this.NodeTree.push(elem);
		}
	}
	function selectedNode(){
		var pointer = '';
		if(this.depth != undefined){
		for(var i=0;i<this.depth.lenght;i++){
			pointer += "[" + this.depth[i] + ']';
		}
		return eval('this.NodeTree'+pointer);
		}
		return this.NodeTree;
	}
	
	function refresh(){
		$('#editor').html('');
		HandleOneElement.ArrayFunction(cubes) ;
		
	}
}


function WebElement(){
	this.DOM = '<div> test </div>';
}

function HandleOneElement( webelement ) {
			$('#editor').html($('#editor').html()+webelement.DOM);
}


function.prototype.ArrayFunction = function(param) {
  if (param instanceof Array) {
    return param.map( Function.prototype.ArrayFunction, this ) ;
  }
  else return (this)(param) ;
}
