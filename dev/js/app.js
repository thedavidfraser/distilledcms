(function(){

    var data = require('./data'),
        settings = require('./settings'),
        render = require('./render'),
        markupArray = require('./markup-array'),
//        scriptEdit = require('./scriptEdit'),
//        scriptShowData = require('./scriptShowData'),
        markupFooter = require('./markup-footer');
     
    var editMode = false;

    if(!editMode){
        render( markupArray(data, settings) + "\n\n" + markupFooter() );
    } else {
//        scriptEdit(data, settings);
//        scriptShowData(data, settings);
    }
    scriptFooter();

})();