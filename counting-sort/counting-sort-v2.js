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

function ascendingOrder (a, b) {
    return Number(a) - Number(b);
}

Math.midpoint = function (d) { 
    return d % 2 === 1? Math.floor(d / 2) : (Math.floor(d / 2) - 1 + Math.floor(d / 2)) / 2;
}

function getRange(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

function median (h, midpoint, range) {
    var temp = 0, prev;
    var isEven = (midpoint % 1 !== 0);
    for (let i of getRange(0, range)) {
        if (h.has(i)) {
            temp += h.get(i);
        }
        if (temp >= midpoint + 1) {
            if (isEven) {
                return (i + prev) / 2;
            } else {
                return i;
            }
        }
        if (h.has(i)) prev = i;
    }
    throw new Error('No midpoint found.');
}

Map.prototype.append = function (n) {
    if (this.has(n)) this.set(n, this.get(n) + 1);
    else this.set(n, 1);
};

function activityNotifications(exp, d) {
    /*
     * Declare the number of activitiy notifications
    */
    var counter = 0;

    /*
     * Declare the initial array of elements from beginning
     * of array to d - 1.
    */
    var arr = exp.slice(0, d - 1);

    /*
     * Hashmap the frequency distribution
    */
    var h = new Map();
    for (let i of arr) h.append(i);

    /*
     * Run loop through the main array to determine
     * the median of the last d digits.
     * 1) Firstly we need to append the next digit
     * 2) Then we calculate the median of the result
     * 3) Then we take the next digit and compare it to median
     */
    for (let i = d; i < exp.length; i++) {
        /*
         * Declare the first digit in the array
         * which we will remove after the median 
         * calculation
        */
        var firstDigit = exp[i - d];

        /*
         * 1) Append the (i-1)th digit
         */
        var next = exp[i - 1];
        h.append(next);

        /*
         * Calculte median across the array
        */
        var m = median(h, Math.midpoint(d), 200);

        /*
         * If two times median is less than the
         * next digit than it is a notification
         */
        next = exp[i];
        console.log(next, h, m);
        if (next >= 2 * m) console.log('found fraud', ++counter);

        /*
         * Get rid of the first digit in the array
         */
        h.set(firstDigit, h.get(firstDigit) - 1);
        if (h.get(firstDigit) === 0) h.delete(firstDigit);
    }
    return counter;
}

console.log(activityNotifications([1, 2, 3, 4, 4], 4));


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
