module.exports = function(data) {

	"use strict";

	var showData = function(data){

		$el = $('<textarea>');
		$el.attr('id', 'data');
		$el.val(JSON.stringify(data));
		$('body').append($el);

	};

	return showData(data);

};