module.exports = function(headContent, bodyContent){

	"use strict";

	var element = require('./element');

  	return element.html.replace(/{{head}}/, headContent).replace(/{{body}}/, bodyContent);

};