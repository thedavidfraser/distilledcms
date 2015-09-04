module.exports = function(data, settings){

	var utils = require('./utils'),
      	element = require('./element');

    var getElementHead = function(elName, contentString){

		if(!contentString){
			return element.head[elName];
		} else {
			return element.head[elName].replace(/{{s}}/g, contentString);
		}
	
	};

    var getOpenGraphElements = function(dataArray, settings){

        var output = [],
            ogRequestProtocal = 'http://';

        output.push( getElementHead("ogTitle", dataArray[0]) );

        if(settings.siteName){
            output.push( getElementHead("ogSiteName", settings.siteName) );
        }

        output.push( getElementHead("ogImage", ogRequestProtocal + settings.domain + settings.avatar) );

        if(utils.isString(dataArray[1])){
            output.push( getElementHead("ogDescription", dataArray[1]) );
        }

        return output.join("\n");

    };

    var markupHead = function(dataArray, settings){

    	var output = [];

    	output.push( getElementHead("charSet") );
    	output.push( getElementHead("ieEngineVersion") );
    	output.push( getElementHead("viewport") );
        output.push( getElementHead("stylesheet") );
		output.push( getElementHead("title", dataArray[0]));

		if(utils.isString(dataArray[1])){
    		output.push( getElementHead("description", dataArray[1]));
    	}

        output.push( getOpenGraphElements(dataArray, settings) );

    	return output.join("\n");

    };

    return markupHead(data.content, settings);

};