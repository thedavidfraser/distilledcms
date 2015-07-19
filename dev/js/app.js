(function(){

    var getData = require('./data'),
        script = require('./script'),
        scriptEdit = require('./scriptEdit'),
        scriptShowData = require('./scriptShowData'),
        scriptFooter = require('./scriptFooter');
     
    var editMode = false,
        data = getData();

    if(!editMode){
        script(data);
    } else {
        scriptEdit(data);
        scriptShowData(data);
    }
    scriptFooter();

})();