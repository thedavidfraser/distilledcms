module.exports = function() {

  "use strict";

  var appendFooter = function(){

    var $footer = $('<div class="footer"><h2>PA Me <span>footer</span></h2><p><a href="http://www.pame.uk">Home</a> | <a href="/about">About</a> | <a href="mailto:hello@pame.uk">hello@pame.uk</a><p>&copy; 2015 PA Me Ltd</p></h2></div>');
    $('body').append($footer);

  };

  return appendFooter();

};