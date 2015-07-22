module.exports = {

  //If li return new string else return false
  listitem : function(str){
    return str.charAt(0) === "-" ? str.substring(1) : false;
  },

  //If blockquote content return new string else return false
  blockquoteParagraph : function(str){

    var element = require('./element');

    if(str.charAt(0) !== '"'){
      return false;
    }

    if(str.charAt(str.length-1) === '"'){
      return element.inline.quotationMark + str.substring(1, str.length-1) + element.inline.quotationMark;
    } else {
      return element.inline.quotationMark + str.substring(1);
    }
  }

};