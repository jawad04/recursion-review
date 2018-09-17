// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  //first stringify primitives
  if(typeof obj === 'number' || typeof obj === 'boolean'){
    return '' + obj;
  }
  if(obj === null){
    return 'null';
  } 
  if(typeof obj === 'string'){
    return '"' + obj + '"';
  }

 //code for arrays

  if(Array.isArray(obj) && obj.length === 0){
    return '[]';
  }
  var arrayRecursion = function (arr) {
    if(arr.length === 0){
      return ']';
    }
    if(typeof arr[0] === 'string'){
      if(arr.length > 1){
        return '"' + arr[0] + '"' + ',' + arrayRecursion(arr.slice(1));
      }
      return '"' + arr[0] + '"' + arrayRecursion(arr.slice(1));
    }
    if(Array.isArray(arr[0]) && arr[0].length === 0){
      if(arr.length > 1){
        return '[],' + arrayRecursion(arr.slice(1));
      }
      return '[]' + arrayRecursion(arr.slice(1));
    }
    if(Array.isArray(arr[0])){
      return '[' + arrayRecursion(arr[0]) + arrayRecursion(arr.slice(1));
    }
    if(arr.length > 1){
      return arr[0] + ',' + arrayRecursion(arr.slice(1));
    }
    return arr[0] + arrayRecursion(arr.slice(1)); 
  }
  if(Array.isArray(obj)){
    return '[' + arrayRecursion(obj);
  }
 
  //code for objects

  var objectRecursion = function (object){
    var objArray = [];
    for(var key in object){
      objArray.push('"', key, '"');
      objArray.push(':');
      objArray.push('"', object[key], '"');
      
    }
    return '{' + objArray.join('') + '}';
  }

  if(typeof obj === 'object'){
    return objectRecursion(obj);
  }
};
