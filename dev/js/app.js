(function(){

    var data = require('./data'),
        settings = require('./settings'),
        render = require('./render'),
        markupArray = require('./markupArray'),
//        scriptEdit = require('./scriptEdit'),
//        scriptShowData = require('./scriptShowData'),
        markupFooter = require('./markupFooter');
     
    var editMode = false;

    if(!editMode){
        render( markupArray(data, settings) + "\n\n" + markupFooter() );
    } else {
//        scriptEdit(data, settings);
//        scriptShowData(data, settings);
    }
    scriptFooter();

})();