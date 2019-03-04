'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the maxSubsetSum function below.
function maxSubsetSum(arr) {
    var i = 0;
    var a1 = [], a2 = [];
    while (i < arr.length) { 
        if (i % 2 === 1) {
            a1.push(arr[i]);
        } else {
            a2.push(arr[i]);
        }
        i++;
    }
    function byVal(a, b) { return b - a; }
    a1 = a1.sort(byVal);
    a2 = a2.sort(byVal);
    var s1 = 0;
    var s2 = 0;
    i = 0;
    while (i < a1.length) { 
        if (a1[i] >= 0) {
            s1 += a1[i];
        }
        i++;
    }
    i = 0;
    while (i < a2.length) { 
        if (a2[i] >= 0) {
            s2 += a2[i];
        }
        i++;
    }
    if (s1 === 0) { 
        s1 = a1[0];
    }
    if (s2 === 0) { 
        s2 = a2[0];
    }
    console.log(a1,a2);
    return Math.max(s1,s2);
}

function main() {

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = maxSubsetSum(arr);
    console.log(res);


}
