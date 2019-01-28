'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = ('' + fs.readFileSync('./merge-sort-data.txt')).split('\n');
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
//
function readLine() {
    return inputString[currentLine++];
}

var inversions = 0;

function mergesort(arr, temp, leftStart, rightEnd) {
    if (leftStart >= rightEnd) return;
    var middle = Math.floor((leftStart + rightEnd) / 2);
    mergesort(arr, temp, leftStart, middle);
    mergesort(arr, temp, middle + 1, rightEnd);
    mergeHalves(arr, temp, leftStart, rightEnd);
}

function mergeHalves(arr, temp, leftStart, rightEnd) {
    var leftEnd = Math.floor((leftStart + rightEnd) / 2);
    var rightStart = leftEnd + 1;
    var left = leftStart;
    var right = rightStart;
    var index = leftStart;
    while (left <= leftEnd && right <= rightEnd) {
        if (arr[left] <= arr[right]) {
            temp[index] = arr[left];
            left++;
        } else {
            var x = inversions;
            if (!inversions) inversions = 0;
            inversions += leftEnd - left + 1;
            temp[index] = arr[right];
            right++;
        }
        index++;
    }
    while (left <= leftEnd) {
        temp[index++] = arr[left++];
    }
    while (right <= rightEnd) {
        temp[index++] = arr[right++];
    }
    var i = leftStart;
    while (i < (rightEnd - leftStart + 1)) {
        arr[i] = temp[i];
        i++;
    }
}

// Complete the countInversions function below.
function countInversions(arr) {
    mergesort(arr, [], 0, arr.length - 1);
    var i = inversions;
    inversions = 0;
    return i;
}

function main() {

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = countInversions(arr);

        console.log(result + '\n');
    }

}

