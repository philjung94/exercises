
// Create an object literal
var obj = {};

// Get its dunder proto
console.log(obj.__proto__);


console.log(Object.prototype);

// Get the dunder proto of Object.prototype
console.log(Object.prototype.__proto__);


/*
 * Object lookup behaviour of javascript
 * 1) Look for the key in the object's properties
 * 2) Look for the key in the object's prototype
 * 3) Go to the prototype of the prototype in (2) and look
 * 4) Repeat until the __proto__ of the object is null
 * We have reached the top of the prototype hierarchy
 * */



var arr = [];
console.log(arr.__proto__);
console.log(arr.__proto__.__proto__);
console.log(arr.__proto__.__proto__.__proto__);

var fn = function () {};
console.log(fn.__proto__);
console.log(fn.__proto__.__proto__);
console.log(fn.__proto__.__proto__.__proto);

