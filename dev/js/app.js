(function(){

    var getData = require('./data'),
        script = require('./script'),
        scriptEdit = require('./scriptEdit'),
        scriptShowData = require('./scriptShowData');
     
    var editMode = false,
        data = getData();

    if(!editMode){
        script(data);
    } else {
        scriptEdit(data);
        scriptShowData(data);
    }

})();