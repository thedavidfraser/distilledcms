module.exports = function(contentArray, childLevelArray, levelCount, arrayDepth){

  "use strict";

  var element = require('./element');

  var i,
      output = "",
      outputContent = "",
      newLinePrefix = "\n";

  for(i = 0; i < arrayDepth; i++){
    newLinePrefix = newLinePrefix + "\t";
  }

  //Wrap content
  outputContent = newLinePrefix + element.format.levelContentInner.replace(/{{content}}/, newLinePrefix + contentArray.join(newLinePrefix)).replace(/{{levelCount}}/, levelCount);

  //Add strings to output
  output += newLinePrefix + element.format.levelContent.replace(/{{content}}/, outputContent).replace(/{{levelCount}}/, levelCount);

  if(childLevelArray.length){
    output += newLinePrefix + element.format.levelChildGroup.replace(/{{content}}/, childLevelArray.join("\n")).replace(/{{levelCount}}/, levelCount);
  }

  //Wrap output
  output = newLinePrefix + element.format.level.replace(/{{content}}/, output).replace(/{{levelCount}}/, levelCount).replace(/{{depth}}/, arrayDepth);

  return output;

};