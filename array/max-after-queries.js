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

// Complete the arrayManipulation function below.
function arrayManipulation(n, queries) {
    var arr = [];
    var max = 0;
    var acc = 0;
    /*
    We can essentially traverse the queries and 
    take note of all the intervals that have increments
    assigned to them
    */
    var am = new Map();
    var bm = new Map();
    for (var [a, b, k] of queries) {
        if (am.has(a)) {
            let curr = am.get(a);
            while (curr.next) {
                curr = curr.next;
            }
            curr.next = {val: k, next: undefined};
        } else { 
            am.set(a, { val: k, next: undefined });
        }
        if (bm.has(b)) {
            let curr = bm.get(b);
            while (curr.next) {
                curr = curr.next;
            }
            curr.next = {val: k, next: undefined};
        } else { 
            bm.set(b, { val: k, next: undefined });
        }
    }
    for (var i = 1; i <= n; i++) {
        arr.push(0);
        if (am.has(i)) { 
            let curr = am.get(i);
            while (curr) {
                acc += curr.val;
                curr = curr.next;
            }
        }
        if (bm.has(i - 1)) { 
            let curr = bm.get(i);
            while (curr) {
                acc -= curr.val;
                curr = curr.next;
            }
        }
        arr[i - 1] += acc;
        if (arr[i - 1] > max) max = arr[i - 1];
    }

    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    let queries = Array(m);

    for (let i = 0; i < m; i++) {
        queries[i] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    let result = arrayManipulation(n, queries);

    ws.write(result + "\n");

    ws.end();
}
