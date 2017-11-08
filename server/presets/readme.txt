This is the readme for preset files

MOST IMPORTANT FILE IS systemKeys.hardset.config

this file set some HardCoded Keys these key can not reset dynamicly and will always be the same... 
like -> UP | DOWN | NEXT | ...






Filename will be always 
type.tag/attribute.config

type will be functionalName in node
tag or attribute will be the functional part.

if you set tag without a attribute file it will push it directly into the document 
when you set an attribute file you can define attributes for tags, therefore you will be shifted to the attribute keyboard layout after pressing a tag key 



=type.tag.config settings=

<tag> description [version]
tag-> string 
description -> string
version -> Double or string or integer (optional)

If there are multiple Tags in diffrent version this will be implement later




(optional)
=type.attributes.config=
[is used for linking tag types to allowed attributes with a tag file see example below]

<tag>(attribute)+tagFile+%only%description[verison]#Comment

tag-> can be * for everything
attribute-> string 
tagFile -> file name for link to tag lib (must include .tag.config) or [a|b] for special parameters(optional|Default empty means only attribute)
%only% -> specify allowed tags from tag lib (optional) // TODO: Later there could be a validation 
description -> string
version -> Double or string or integer (optional)
# (means comment) -> string




=Example of use case =

-Example 1-
html5.tag.config 
<div>Bezeichnet ein allgemeines Container-Element ohne spezielle semantische Bedeutung. Wird oft zusammen mit class- oder id-Attributen verwendet, um es in Skripts oder Stylesheets auswählen zu können.
html5.attributes.config
<div>(style)+css.tag.config+%*%#this allows div elements to add a "style" attribute with all Tags from css

result:
<div style="TAGLIB<TAG>:TAGLIB<attribute>;"></div>


-Example 2-
html5.tag.config 
<video>Steht für eine Videodatei und die dazugehörigen Audiodateien, sowie die für das Abspielen nötigen Kontrollelemente.
html5.attributes.config
<video>(autoplay)++%%#this allows video elements to add a "autoplay" attribute with all Tags from nothing (Means no TagLib only add autoplay) without any parameter

<video autoplay></video>

-Example 3-
html5.tag.config
<form>Markiert ein Formular. Formulare bestehen typischerweise aus einer Reihe von Kontrollelementen, deren Werte zur weiteren Verarbeitung an einen Server übertragen werden.
html5.attributes.config
<form>(method)+[GET|POST]+%%# This gives <form> a special attribute method with 2 Values POST or GET without any validation

