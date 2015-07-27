module.exports = function() {

  "use strict";

  var appendFooter = function(){

    var $footer = $('<div class="footer"><h2>David Fraser <span>footer</span></h2><p>Copyright &copy; 2015 David Fraser</p></div>');
    $('body').append($footer);

  };

  return appendFooter();

};