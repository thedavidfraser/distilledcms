module.exports = function(dataSrc, settingsSrc, markupFooterSrc){

  /* Custom modules, data, settings etc */
  var data = require(dataSrc),
      settings = require(settingsSrc),
      markupFooter = require(markupFooterSrc);

  /* Common modules */
  var markupArray = require('./markup-array'),
      markupHead = require('./markup-head'),
      markupHtmlOutline = require('./markup-html-outline');

  var headContent = markupHead(data, settings),
      bodyContent = markupArray(data, settings) + '\n\n' + markupFooter();

  return markupHtmlOutline( headContent,  bodyContent);

};