module.exports = function(data, settings) {

  "use strict";

  var utils = require('./utils'),
      element = require('./element'),
      stringType = require('./string-type'),
      markupString = require('./markup-string'),
      formatOutput = require('./format-output');

  var levelCount = -1,
      arrayDepth = -1;

  //Note this function calls itself when encountering nested arrays
  var markupArray = function(dataArray){

    var i,
        item,
        nextItem,
        output,
        outputContent = [],
        outputContentGroup = [],
        outputChildGroup = [],
        levelCountNow;

    arrayDepth++;
    levelCount++;

    levelCountNow = levelCount;


    //Loop through array and populate both outputContent (text) and outputChildGroup (nested arrays)
    for(i = 0; i < dataArray.length; i++){
      item = dataArray[i];
      nextItem = dataArray[i+1];

      if(utils.isArray(item)){
        outputChildGroup.push(markupArray(item));
      } else {
        //string

        //Unordered list
        if(stringType.listitem(item)){

          outputContentGroup.push(markupString( i, item, arrayDepth, settings ));

          //Is next item not an unordered list 
          //Format and add unordered list to outputContent
          if( !utils.isString(nextItem) || utils.isString(nextItem) && !stringType.listitem(nextItem) ){
            outputContent.push(element.format.ul.replace(/{{content}}/, outputContentGroup.join("")));
            outputContentGroup = [];
          }

        //blockquote
        } else if(stringType.blockquoteParagraph(item)){

          outputContentGroup.push(markupString( i, item, arrayDepth, settings ));

          //Is next item not an unordered list 
          //Format and add unordered list to outputContent
          if( !utils.isString(nextItem) || utils.isString(nextItem) && !stringType.blockquoteParagraph(nextItem) ){
            outputContent.push(element.format.blockquote.replace(/{{content}}/, outputContentGroup.join("")));
            outputContentGroup = [];
          }

        } else {
          outputContent.push(markupString( i, item, arrayDepth, settings ));
        }
      }

    }

    output = formatOutput(outputContent, outputChildGroup, levelCountNow, arrayDepth);

    arrayDepth--;

    return output;

  };

  return markupArray(data.content, settings);

};