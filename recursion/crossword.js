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

// Complete the crosswordPuzzle function below.
function crosswordPuzzle(crossword, hints) {
    solve(crossword, hints.split(';'));
    return crossword;
}

function* possibleLocations(crossword, word) {
    var len = word.length;
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10 - len + 1; col++) {
            let possible = true;
            for (let k = 0; k < len; k++) {
                if (!['-', word[k]].some(cv => cv === crossword[row][col + k])) {
                    possible = false;
                    break;
                }
            }
            if (possible) {
                yield ({ row, col, axis: 0 });
            }
        }
    }
    for (let row = 0; row < 10 - len + 1; row++) {
        for (let col = 0; col < 10; col++) {
            let possible = true;
            for (let k = 0; k < len; k++) {
                if (!['-', word[k]].some(cv => cv === crossword[row + k][col])) {
                    possible = false;
                    break;
                }
            }
            if (possible) {
                yield ({ row, col, axis: 1 });
            }
        }
    }
}

function revert(crossword, word, loc) {
    var { row, col, axis } = loc;
    if (axis === 0) {
        for (let k = 0; k < word.length; k++) {
            crossword[row][col + k] = '-';
        }
    } else {
        for (let k = 0; k < word.length; k++) {
            crossword[row + k][col] = '-';
        }
    }
}

function move(crossword, word, loc) {
    var { row, col, axis } = loc;
    if (axis === 0) {
        for (let k = 0; k < word.length; k++) {
            crossword[row][col + k] = word[k];
        }
    } else {
        for (let k = 0; k < word.length; k++) {
            crossword[row + k][col] = word[k];
        }
    }
}
var solved = false;
function solve(crossword, words) {
    if (words.length === 0) {
        solved = true;
        return;
    }
    var word = words.pop();
    var possibleLocs = [];
    for (var loc of possibleLocations(crossword, word)) {
        move(crossword, word, loc);
        solve(crossword, words);
        !solved && revert(crossword, word, loc);
    }
    words.push(word);
}


function main() {
    const ws = fs.createWriteStream('./output');

    let crossword = [];

    for (let i = 0; i < 10; i++) {
        const crosswordItem = readLine().trim().split('');
        crossword.push(crosswordItem);
    }

    const words = readLine();

    const result = crosswordPuzzle(crossword, words).map(cv => cv.join(''));

    ws.write(result.join('\n') + '\n');

    ws.end();
}
