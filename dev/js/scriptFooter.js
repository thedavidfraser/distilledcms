module.exports = function() {

  "use strict";

  var appendFooter = function(){

    var $footer = $('<div class="footer"><h2>PA Me <span>footer</span></h2><p>&copy; 2015 PA Me Ltd</p></h2></div>');
    $('body').append($footer);

  };

  return appendFooter();

};