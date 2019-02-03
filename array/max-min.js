'use strict';

const fs = require('fs');


process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '' + fs.readFileSync('max-min-datatxt.txt');
inputString = inputString.split('\n');
let currentLine = 0;
main();

//process.stdin.on('data', inputStdin => {
//    inputString += inputStdin;
//});
//
//process.stdin.on('end', function() {
//    inputString = inputString.replace(/\s*$/, '')
//        .split('\n')
//        .map(str => str.replace(/\s*$/, ''));
//
//    main();
//});

function readLine() {
    return inputString[currentLine++];
}

// Complete the maxMin function below.
function maxMin(k, arr) {
    /* 
    1) Sort the array
    2) For each element x1 of index i, check x2 = arr[(i + k) - 1]
    3) If x2 - x1 < min, min = x2 - x1
    */
    var min = Number.MAX_SAFE_INTEGER;
    var a = arr.sort(function (a, b) {
        return a - b;
    });
    var i = 0;
    var x1, x2;
    while (i < arr.length) {
        x1 = a[i];
        x2 = a[i + k - 1];
        if (!x2) break;
        if (x2 - x1 < min) { 
            min = x2 - x1;
        }
        i++;
    }
    return min;
}

function main() {

    const n = parseInt(readLine(), 10);

    const k = parseInt(readLine(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(readLine(), 10);
        arr.push(arrItem);
    }

    const result = maxMin(k, arr);
    console.log('result', result);

}

