module.exports = function(data) {

	"use strict";

	var showData = function(data){

		$('#data').val(JSON.stringify(data));

	};

	return showData(data);

};