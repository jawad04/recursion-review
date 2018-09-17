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

  var objectRecursion = function (object){
    var objArray = [];
    for(var key in object){
      if(typeof object[key] === 'string'){
        objArray.push('"' + key + '"' + ':' + '"' + object[key] + '"');
      }
      if(object[key] === null){
        objArray.push('"' + key + '"' + ':' + 'null');
      }
      if(typeof object[key] === 'number' || typeof object[key] === 'boolean'){
      objArray.push('"' + key + '"' + ':' + object[key]); 
      }
      if(Array.isArray(object[key])){
        objArray.push('"' + key + '"'+ ':' + '[' + arrayRecursion(object[key]));
      }
      if(typeof object[key] === 'object' && object[key] !== null && !Array.isArray(object[key])){
        objArray.push('"' + key + '"' + ':' + objectRecursion(object[key]));
      }
    }
    return '{' + objArray + '}';
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
    if(typeof arr[0] === 'object'){
      if(arr.length > 1){
        return objectRecursion(arr[0]) + ',' + arrayRecursion(arr.slice(1));
      }
      return objectRecursion(arr[0]) + arrayRecursion(arr.slice(1));
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

  
 
  if(typeof obj === 'object'){
    return objectRecursion(obj);
  }
};
