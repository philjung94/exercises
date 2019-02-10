'use strict';

const fs = require('fs');

let inputString = '' + fs.readFileSync('./balanced-brackets-data.txt');
inputString = inputString.split('\n');
let currentLine = 0;
let outputString = '' + fs.readFileSync('./balanced-bracket-output.txt');
outputString = outputString.split('\n');
main();


function readLine() {
    return inputString[currentLine++];
}

// Complete the isBalanced function below.
function isBalanced(s, withLog = false) {
    var stack = [];
    var open = {
        '{': true,
        '[': true,
        '(': true,
    };
    var close = {
        '}': '{',
        ']': '[',
        ')': '(',
    };

    for (let i of s) { 
        if (open[i]) {
            stack.push(i);
        } else { 
            if (close[i] !== stack.pop()) {
                return 'NO';
            }
        }
    }
    if (stack.length) {
        return 'NO';
    }
    return 'YES';
}

function main() {

    const t = parseInt(readLine(), 10);
    let strings = [];
    let results = [];

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();
        strings.push(s);
        results.push(isBalanced(s));
    }
    for (let i = 0; i < results.length; i++) {
        if (results[i] !== outputString[i]) {
            console.log(i, inputString[i], results[i], outputString[i], results[i] === outputString[i]);
            console.log(isBalanced(s, withLog));
        }
    }

}
