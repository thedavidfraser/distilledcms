module.exports = function(){

  var data = require('./data-david-fraser'),
      settings = require('./settings-david-fraser'),
      markupArray = require('./markupArray'),
      markupFooter = require('./markup-footer-david-fraser'),
      markupHead = require('./markupHead'),
      markupHtmlOutline = require('./markupHtmlOutline');

  var headContent = markupHead(data, settings),
      bodyContent = markupArray(data, settings) + '\n\n' + markupFooter();

  return markupHtmlOutline( headContent,  bodyContent);

};