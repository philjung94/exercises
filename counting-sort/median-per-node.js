'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function oddity (n) {
    return n % 2 === 0? 'even' : 'odd';
}

Math.median = function (arr) { 
    var x = arr[arr.length % 2 === 1 ? Math.floor(arr.length / 2) :
        (arr.length / 2) - 1];
    if (arr.length % 2 === 0) { 
        x += arr[(arr.length / 2)];
        x /= 2;
    }
    return x;
}

function ascendingOrder (a, b) {
    return a - b;
}

/*
 * This is a binary search function that 
 * returns the index value after which the 
 * value of i fits into array arr which
 * is sorted in ascending order.
*/


function binarySearch (arr, i, j) {
    var k = j;
    if (arr.length < 1) {
        throw new Error('Array length is 0');
    }
    if (arr.length === 1) {
        return k + 1;
    }
    var m  = Math.floor(arr.length / 2);
    var a = arr.slice(0, m);
    var b = arr.slice(m);
    if (i > b[0]) {
        k += m;
        return binarySearch(b, i, k);
    } else {
        return binarySearch(a, i, k);
    }
}

//console.log(binarySearch([2,3], 4, 0));
// Complete the activityNotifications function below.
function activityNotifications(exp, d) {
    var n = 0;
    // Let's get the first relevant element to get the median value at d
    // Array.slice(a, b) 
    // The method selects elements from the start argument, and up to (but not including) the end argument.
    var arr = exp.slice(0, d).sort(ascendingOrder); // Get the values from arr[0] to arr[d-1]
    if (exp[d] >= 2* Math.median(arr)) n++;
    var m, mg = [];
    for (var i = d; i < exp.length; i++) {
        arr.shift();
        var mp = arr.length / 2;
        switch (oddity(arr.length)) {
            case 'odd':
                mg = [arr[Math.floor(mp) - 1], arr[Math.floor(mp), arr[Math.ceil(mp)]]];
                if (mg[0] >= exp[i]) {
                    m = (mg[0] + mg[1]) / 2;
                } else if (mg[2] >= exp[i]) {
                    m = (i + mg[1]) / 2;
                } else {
                    m = (mg[1] + mg[2]) / 2;
                }
                break;
            case 'even':
                mg = [arr[mp - 1], arr[mp]];
                if (mg[0] >= exp[i]) {
                    m = mg[0];
                } else if (mg[1] > exp[i]) {
                    m = i;
                } else {
                    m = mg[1];
                }
                break;
            default:
                break;
        }
        //var replaceIndex = binarySearch(arr, exp[i], 0);
        //var temp = arr[replaceIndex];
        //var newArr = arr.slice(0, replaceIndex);
        //newArr.push(exp[i]);
        //for (let j of [temp].concat(arr.slice(replaceIndex))) {
        //    j && newArr.push(j);
        //}
        //exp[i+1] >= 2 * Math.median(newArr) && n++;
        //arr = newArr;
        ////exp[i] >= 2 * Math.median(exp.slice(i - d, i)) && n++;
    }
    return n;
}

console.log(activityNotifications([1, 2, 3, 4, 60, 4], 3));
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const exp = readLine().split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    let result = activityNotifications(exp, d);

    ws.write(result + "\n");

    ws.end();
}
