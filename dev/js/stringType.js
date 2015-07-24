module.exports = {

  /**
   * If a string is a list item then return string else false
   * A string is a list item if it starts with a hyphen
   * Returns the original string with hyphen removed
   *
   * @param  {String}
   * @return {String} {Boolean}
  */
  listitem : function(str){
    return str.charAt(0) === "-" ? str.substring(1) : false;
  },

  /**
   * If a string is a blockquote paragraph then return string else false
   * A string is a blockquote paragraph if it starts with a quote "
   * Returns the original string with additional HTML markup
   *
   * @param  {String}
   * @return {String} {Boolean}
  */  blockquoteParagraph : function(str){

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