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

// Complete the isValid function below.
function isValid(s) {
    var h1 = {};
    for (let i of s) {
        if (h1[i]) h1[i]++;
        else h1[i] = 1;
    }
    var h2 = {};
    for (let i of Object.keys(h1)) { 
        if (h2[h1[i]]) {
            h2[h1[i]]++;
        } else { 
            h2[h1[i]] = 1;
        }
    }
    var keys = Object.keys(h2);
    console.log(h2);
    if (keys.length === 1) {
        return 'YES';
    } else if (keys.length > 2) {
        return 'NO';
    } else { 
        if (Math.abs(Number(keys[0]) - Number(keys[1])) !== 1) {
            for (let i of keys) { 
                if (Number(i) === 1) return 'YES';
            }
            return 'NO';
        }
        for (let i of keys) {
            if (h2[i] === 1) return 'YES';
        }
        return 'NO';
    }

}

function main() {

    const s = readLine();

    console.log(isValid(s));

}

