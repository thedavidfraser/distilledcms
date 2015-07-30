module.exports = function(data, settings){

	var utils = require('./utils'),
      	element = require('./element');

    var getElementHead = function(elName, contentString){

		if(!contentString){
			return element.head[elName];
		} else {
			return element.head[elName].replace(/{{content}}/g, contentString);
		}
	
	};

    var markupHead = function(dataArray){

    	var output = [];

    	output.push( getElementHead("charSet") );
    	output.push( getElementHead("ieEngineVersion") );
    	output.push( getElementHead("viewport") );

		output.push( getElementHead("title", dataArray[0]));

		if(utils.isString(dataArray[1])){
    		output.push( getElementHead("description", dataArray[1]));
    	}
    	output.push( getElementHead("stylesheet") );    	

    	return output.join("\n");

    };

    return markupHead(data.content, settings);

};