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
  */  
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
  },

  /**
   * If a string is a paragraph with CTA return string else false
   * A string is a paragraph with CTA if it starts with [http://www.example.com] followed by text
   * Returns the original string with additional HTML markup
   *
   * @param  {String}
   * @return {String} {Boolean}
  */  
  paragraphWithCta : function(str){

    var element = require('./element'),
        strArray;

    if(str.charAt(0) !== '['){
      return false;
    }

    strArray = str.split("]");

    strArray[0] = strArray[0].substring(1); //remove beginning [
    strArray[1] = strArray[1].substring(1); //remove beginning white space

    //External link
    if(strArray[0].indexOf('http') === 0){
      return element.inline.anchorLinkExternal.replace('{{href}}', strArray[0]).replace('{{s}}', strArray[1]);  
    }
    return element.inline.anchorLink.replace('{{href}}', strArray[0]).replace('{{s}}', strArray[1]);

  }

};