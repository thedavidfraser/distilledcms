(function(){

    var data = require('./data'),
        settings = require('./settings'),
        render = require('./render'),
        markupArray = require('./markupArray'),
//        scriptEdit = require('./scriptEdit'),
//        scriptShowData = require('./scriptShowData'),
        scriptFooter = require('./scriptFooter');
     
    var editMode = false;

    if(!editMode){
        render( markupArray(data, settings) );
    } else {
//        scriptEdit(data, settings);
//        scriptShowData(data, settings);
    }
    scriptFooter();

})();