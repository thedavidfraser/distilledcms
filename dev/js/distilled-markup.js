module.exports = function(){

  var data = require('./data'),
      settings = require('./settings'),
      markupArray = require('./markupArray'),
      markupFooter = require('./markupFooter'),
      markupHead = require('./markupHead'),
      markupHtmlOutline = require('./markupHtmlOutline');

  var headContent = markupHead(data, settings),
      bodyContent = markupArray(data, settings) + '\n\n' + markupFooter();

  return markupHtmlOutline( headContent,  bodyContent);

};