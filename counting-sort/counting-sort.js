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
    return Number(a) - Number(b);
}

//function countingSortMap (arr) {
//    var h = {};
//    for (var i of arr) {
//        if (!h[i]) h[i] = 1;
//        else h[i]++;
//    }
//    for (var i of Object.keys(h[i]).sort(ascendingOrder).slice(1)) { 
//        h[i] = h[i] + h[i - 1];
//    }
//    return h;
//}

function countingSortMap (arr) {
    var h = new Map();
    for (var i of arr) {
        if (!h.has(i)) h.set(i, 1);
        else h.set(i, h.get(i) + 1);
    }
    var ascendingKeys = Array.from(h.keys()).sort(ascendingOrder);
    var prev = ascendingKeys[0];
    for (var i of ascendingKeys.slice(1)) {
        h.set(i, h.get(i) + h.get(prev));
        prev = i;
    }
    return h;
}

Map.prototype.median = function (d) {
    switch (oddity(d)) {
        case 'odd':
            for (let [k, v] of this) {
                if (v === Math.floor(d / 2)) {
                    return Number(k);
                }
            }
            break;
        case 'even':
            var mid = [];
            for (let [k, v] of this) {
                if (v === (d / 2) - 1 || v === (d / 2)) {
                    mid.push(k);
                }
            }
            if (mid.length < 2) throw new Error('mid length less than two');
            return (mid[0] + mid[1]) / 2;
    }
    console.log(this);
    throw new Error('No midpoint found');
}

function activityNotifications(exp, d) {
    var n = 0;
    /*
     * Append to the sort map 
     * for each new node in the array
     * as we traverse exp and create arr
     * from the last d digits
     *
     * */
    var arr = exp.slice(0, d - 1);
    var counter = 0;
    var h = countingSortMap(arr);
    var offsetMap = new Map();
    for (let i = d - 1; i < exp.length; i++) {
        h.set(exp[i], h.has(exp[i])? h.get(exp[i]) + 1 : 1);
        var temp = 0;
        for (let [k, v] of h) {
            if (Number(k) < exp[i]) temp++;
            if (Number(k) > exp[i]) h.set(k, h.get(k) + 1);
            if (Number(k) === exp[i]) {
                if (Number(k) >= arr[counter]) offsetMap.set(k, h.get(exp[i]) + temp - 1);
                else offsetMap.set(k, h.get(exp[i]) + temp);
            } else {
                if (Number(k) >= arr[counter]) offsetMap.set(k, h.get(k) - 1);
            }
        }
        h.set(exp[i], h.get(exp[i]) + temp);
        console.log('h', h);
        console.log('offsetMap', offsetMap);
        /*
         * You're confusing the frequency map with
         * the order map. You don't deduct from the order map,
         * only the frequency map.
         */
        h = new Map([...h, ...offsetMap]);
        console.log('hh', h);
        var median = h.median(d);
        console.log('median', median);
        if (exp[i] >= 2 * median) n++;
        if (h.get(arr[counter]) === 0) {
            h.delete(arr[counter]);
            offsetMap.delete(arr[counter]);
        }
        counter++;
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
