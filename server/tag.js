/*


this is the tag object 

Tag can be an HTML Element, even the Style Attribute is an TAG with Children of type CSS, these children are Tags with attributes but linear 

Example of a HTML element 
source.push({'children':new Array(),'tag':'div','attributes':[{'tag':'style','attributes':[{'tag':'margin','attributes':'10px'}]},{'tag':'class','attributes':[{'tag':'CSSClass','attributes':''}]}]})

source[0].children = new Array(); 
output: <div style="margin:10px" class="CSSClass"></div>

source[0].children.push({'children':new Array(),'tag':'div','attributes':[{'tag':'style','attributes':[{'tag':'margin','attributes':'10px'}]}]})
output: <div style="margin:10px" class="CSSClass"><div style="margin:10px"></div></div>

*/

function tag(){
	this.selectedTag; 	
}