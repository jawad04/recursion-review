// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  // your code here
  //declare array
  //write recursive function
  //check each node to see if the className matches
  //if it does, then push into array
  //call function to check every node

var elementsArr = [];

  var checkNode = function(node){
    if(node.className.includes(className)){
      elementsArr.push(node);
    }
    if(node.nextElementSibling !== null){
      checkNode(node.nextElementSibling);
    }
    if(node.firstElementChild !== null){
      checkNode(node.firstElementChild);
    }
    //console.log(elementsArr);
    //return [];
  }
  
  checkNode(document.body);
  return elementsArr;
};
