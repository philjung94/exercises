'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '' + fs.readFileSync('./efficient-janitor.txt');
let currentLine = 0;
inputString = inputString.split('\n');
main();

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'efficientJanitor' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts FLOAT_ARRAY weight as parameter.
 */


/*
 * A worthwhile note here
 * the predicted side-effect did not occur
 * instead it copied the argument passed in
*/
function excessBags (arr, total) {
    let min = arr[0];
    while (arr[arr.length - 1] + min > 3) {
        arr.pop();
        total++;
    }
    return total;
}

function efficientJanitor(weight) {
    // Write your code here
    let arr = weight.sort((a, b) => a - b);
    let total = 0;
    while (arr.length) {
        if (arr.length === 1) {
            arr.shift();
            total++; 
            break;
        }
        total = excessBags(arr, total);
        arr.shift();
        arr.pop();
        total++;
    }
    return total;
}

function main() {
    const weightCount = parseInt(readLine().trim(), 10);

    let weight = [];

    for (let i = 0; i < weightCount; i++) {
        const weightItem = parseFloat(readLine().trim());
        weight.push(weightItem);
    }

    const result = efficientJanitor(weight);

    console.log(result + '\n');

}

