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

// Complete the abbreviation function below.

function abbreviation(a, b) {
    function isLowerCase(x) {
        return x === x.toLowerCase();
    }
    /*b does not contain lowercase 
    after capitalizing all of a,
    we see if a subsequence of a matches b
    */
    var x = [];
    /*We can delete everything that was previously lower case */
    for (let i of a) {
        x.push({ val: i.toUpperCase(), isLower: isLowerCase(i) });
    }
    var y = b;
    let i = x.length - 1;
    let j = y.length - 1;
    while (i > 0) {
        if (x[i].val === y[j]) {
            j--;
        } else if (x[i].isLower === false) {
            /*
             * This is a mismatch scenario
             * If we encounter an uppercase mismatch
             */
            //while (j <= y.length && y[j] !== x[i].val) {
            //    j++;
            //}
            //if (j > y.length) {
            //    console.log('hit', y[j]);
            //    return 'NO';
            //}
            if (y[j + 1] !== x[i].val) {
                console.log('hit', y[j], j);
                return 'NO';
            }
        }
        console.log(x[i], y[j]);
        i--;
    }
    if (j > 0) {
                console.log('hit', y[j], j);
        return 'NO';
    }
    return 'YES';
}

function main() {

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const a = readLine();

        const b = readLine();

        let result = abbreviation(a, b);
        console.log(result);

    }

}
