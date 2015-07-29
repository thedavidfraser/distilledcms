module.exports = function(i, dataString, arrayDepth, settings) {

  "use strict";

  var element = require('./element'),
      stringType = require('./string-type');

  var getElementBlock = function(elName, str){

    var output = "";
    output += element.block[elName].replace(/{{s}}/g, str);
    return output;

  };

  var markupInlineElements = function(dataString, settings){
    var output = dataString;
    var re = new RegExp("("+settings.siteName+")","g");
    output = output.replace(re, element.inline.siteName);
    return output;
  };

  var markupString = function(i, dataString, arrayDepth, settings){

    var output = "";

    dataString = markupInlineElements(dataString, settings);

    //list item
    if(stringType.listitem(dataString)){
      return getElementBlock("li", stringType.listitem(dataString));
    }

    //blockquote paragraph
    if(stringType.blockquoteParagraph(dataString)){
      return getElementBlock("p", stringType.blockquoteParagraph(dataString));
    }

    //paragraph with CTA
    if(stringType.paragraphWithCta(dataString)){
      return getElementBlock("paragraphWithCta", stringType.paragraphWithCta(dataString));
    }

    //heading
    if(i === 0){
      output = getElementBlock("heading", dataString);
      return output.replace(/{{n}}/g, arrayDepth+1);
    }

    //introduction paragraph
    if(i === 1 && arrayDepth === 0){
      return getElementBlock("introduction", dataString);
    }

    //paragraph (default)
    return getElementBlock("p", dataString);

  };

  return markupString(i, dataString, arrayDepth, settings);

};