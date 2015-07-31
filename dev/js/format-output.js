module.exports = function(contentArray, childLevelArray, levelCount, arrayDepth){

  "use strict";

  var element = require('./element');

  var i,
      output = "",
      outputContent = "",
      newLinePrefix = "\n",
      indentRegExp = new RegExp("{{n(-*)}}", "g");

  var newLineIndent = function(str, $1){
    var i = 0,
        output = newLinePrefix;

    for(i; i < $1.length; i+=1){
      output += "\t";
    }

    return output;
  };

  //Update prefix for nested Levels
  for(i = 0; i < arrayDepth; i++){
    newLinePrefix += "\t\t";
  }

  //Wrap content
  //element.format.levelContentPrefix must be added before replace {{n}} and {{t}}
  outputContent = element.format.levelContentInner
    .replace(/{{content}}/g, element.format.levelContentPrefix + contentArray.join(element.format.levelContentPrefix))
    .replace(/{{levelCount}}/g, levelCount)
    .replace(indentRegExp, newLineIndent);

  //Add strings to output
  output += element.format.levelContent
    .replace(/{{content}}/g, outputContent)
    .replace(/{{levelCount}}/g, levelCount)
    .replace(indentRegExp, newLineIndent);

  //Add child levels
  if(childLevelArray.length){
    output += element.format.levelChildGroup
      .replace(/{{content}}/g, childLevelArray.join(""))
      .replace(/{{levelCount}}/g, levelCount)
      .replace(indentRegExp, newLineIndent);
  }

  //Wrap output to complete Level
  output = element.format.level
    .replace(/{{content}}/g, output)
    .replace(/{{levelCount}}/g, levelCount)
    .replace(/{{depth}}/g, arrayDepth)
    .replace(indentRegExp, newLineIndent);

  //Return formatted level
  return output;

};