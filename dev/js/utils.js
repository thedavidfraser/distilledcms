module.exports = {

  //Check if something is an Array
  //Returns boolean
  isArray : function(thing){
    return !!thing.sort;
  },

  //Check if something is a String
  //Returns boolean
  isString : function(thing){
    //Example of String Object which explains the instanceof part of this test.
    //Creating a string in this way is seen as bad practice.
    //var example = new String('somestring')
    //console.log(typeof example) // returns "object"

    return typeof thing === 'string' || thing instanceof String;
  }

};