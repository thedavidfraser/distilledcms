module.exports = function(data) {

  "use strict";

  var markupAndRenderEditMode = function(data){

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
          return '<label>li <input type="text" data-li="true" value="'+ dataString.substring(1) + '"></label>';
        } else {
          listInProgress = true;
          return '<label>li <input type="text" data-li="true" value="'+ dataString.substring(1) + '"></label>';
        }

        //End list 1/2: if end of array
      } else if(listInProgress) {
        listInProgress = false;
        prefix = ""; //"</ul>";
      }

      //First line defaults to heading
      if(i === 0){
        return prefix + '<label>h'+(arrayDepth+1)+' <input type="text" value="'+ dataString + '"></label>';
      }

      //introduction paragrpah
      if(i === 1 && arrayDepth === 0){
        return prefix + '<div class="label"><textarea>' + dataString + '</textarea></div>';
      }

      if(lastItem){
        return prefix + '<div class="label"><textarea>' + dataString + '</textarea></div>';
      }
      return prefix + '<div class="label"><textarea>' + dataString + '</textarea></div>';
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
      output += '\t\t<input type="hidden" value="start">';
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

      output += '\t<input type="hidden" value="end">';
      output += '</div>';
      return output;
    };


    var buildContentArrayFromForm = function($form){
      var data = {},
          content = [],
          arrayDepth = 0;


      var addToContent = function(value){
        if(arrayDepth === 0){
          content.push(value);
          return;
        }
        if(arrayDepth === 1){
          content[content.length-1].push(value);
          return;
        }
        if(arrayDepth === 2){
          content[content.length-1][content[content.length-1].length-1].push(value);
          return;
        }
        if(arrayDepth === 3){
          content[content.length-1][content[content.length-1].length-1][content[content.length-1][content[content.length-1].length-1].length-1].push(value);
          return;
        }

      };


      $form.find('input[type="text"], input[type="hidden"],textarea').each( function(){
        var $field = $(this),
            output;

        // if($field.data("li")){
        //   addToContent("- "+$field.val());
        //   return;
        // }

        if($field.is('input[type="hidden"]') && $field.val() === "start"){
          addToContent([]);
          arrayDepth++;
          return;
        }

        if($field.is('input[type="hidden"]') && $field.val() === "end"){
          arrayDepth--;
          return;
        }

        addToContent($field.val());
        return;
        
      });

      data.content = content;

      $('#data').val( JSON.stringify(data) );

    };



    var render = function(output){

      $('#edit').html(output);

      //Add submit button
      $('#edit').append('<button id="save">Update JSON</button>');

      $('#save').on('click', function(e){
        e.preventDefault();

        buildContentArrayFromForm($('#edit'));

        alert("JSON updated\nNow File > Save Page As...");
      });

    };

    render(markupArray(data.content));

  };

  return markupAndRenderEditMode(data);

};
