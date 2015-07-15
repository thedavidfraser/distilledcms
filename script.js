
var markupAndRender = function(data){

  var sectionCount = 0,
      arrayDepth = 0,
      itemCountArray = [],
      listInProgress = false,
      lastItemIndexArray = []; //e.g [7,2];

  var markupString = function(i, dataString, lastItem) {

    var prefix = "";

    //If first char hyphen make list item
    //TODO substring whitespace check (perhaps not required)
    if(dataString.indexOf("-") === 0){
      if(listInProgress){
        return "<li>" + dataString.substring(1) + "</li>";
      } else {
        listInProgress = true;
        return "<ul><li>" + dataString.substring(1) + "</li>";
      }

      //End list 1/2: if end of array
    } else if(listInProgress) {
      listInProgress = false;
      prefix = "</ul>";
    }

    //First line defaults to heading
    if(i === 0){
      return prefix + "<h"+(arrayDepth+1)+" class=\"heading\">" + dataString + "</h"+(arrayDepth+1)+">";
    }

    //introduction paragrpah
    if(i === 1 && arrayDepth === 0){
      return prefix + "<p class=\"introduction\">" + dataString + "</strong></p>";
    }

    if(lastItem){
      return prefix + "<p>" + dataString + " <span class=\"end\">END</span></p>";    
    }
    return prefix + "<p>" + dataString + "</p>";
  };

  var isArray = function(thing){
    return !!thing.sort;
  };


  var setLastItemIndexArray = function(array){

    var lastIndex = array.length -1;
    lastItemIndexArray.push(lastIndex);
    if( isArray(array[lastIndex])){
      setLastItemIndexArray(array[lastIndex]);
    }

  };

  var isArrayValueMatch = function( a, b){
    var i;
    for( i = 0; i < a.length; i++){
      if(a[i] !== b[i]){
        return false;
      }
    }
    return true;
  };


  var markupArray = function(dataArray){
    var i,
        output = '';

    if(!arrayDepth){
      //If first array set last item position
      setLastItemIndexArray(dataArray);
    } else {
      output += '\t</div>'; //section-intro
    }
    output += '<div class="section section-'+sectionCount+' depth-'+arrayDepth+'">';
    output += '\t<div class="section-intro section-intro-'+sectionCount+'">';
    sectionCount++;
    for(i = 0; i < dataArray.length; i++){

      itemCountArray[arrayDepth] = i;

      if(isArray(dataArray[i])){
        arrayDepth++;
        output += markupArray( dataArray[i] );
        arrayDepth--;
        itemCountArray.pop();
      } else {
        output += markupString( i, dataArray[i], isArrayValueMatch( itemCountArray, lastItemIndexArray) );
      }
    }

    //End list 2/2: if end of array
    if(listInProgress) {
      listInProgress = false;
      output += "</ul>";
    }

    output += '</div>';
    return output;
  };


  var render = function(output){

    $('#here').html(output);

  };

  render(markupArray(data.content));

}

if(data){
  markupAndRender(data);
}

