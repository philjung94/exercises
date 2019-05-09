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

function Node(value) { 
    this.value = value;
}

// Complete the substrCount function below.
function substrCount(n, s) {
    var curr = new Node(s[0]);
    var head = curr;
    var counter = s.length;
    var i = 1;
    while (i < s.length) { 
        var temp = curr;
        curr.next = new Node(s[i]);
        curr = curr.next;
        curr.prev = temp;
        i++;
    }
    curr = head;

    while (curr) { 
        var window = 0;
        while (curr.next && curr.value === curr.next.value) { 
            window++;
            curr = curr.next;
        }
        while (window >= 1) { 
            counter += window--;
        }
        if (curr.prev && curr.next &&
            curr.prev.value === curr.next.value) { 
            var val = curr.prev.value;
            var temp = curr;
            var prevWindow = 0;
            while (temp.prev && temp.prev.value === val) { 
                temp = temp.prev;
                prevWindow++;
            }
            temp = curr;
            var nextWindow = 0;
            while (prevWindow > 0 && temp.next &&
                temp.next.value === val) {
                prevWindow--;
                nextWindow++;
                temp = temp.next;
            }
            counter += nextWindow;
        }
        curr = curr.next;
    }
    return counter;

    //var counter = s.length - 1;
    //for (var i = 1; i < s.length; i++) { 
        //for (var j = i + 1; j < s.length; j++) { 
        //    ss += s.charAt(j);
        //    var temp = ss;
        //    var m = ss.length / 2 - 0.5;
        //    if (m % 1 === 0) { 
        //        temp = temp.substring(0, m) + temp.substring(m + 1, temp.length);
        //    }
        //    var increment = 1;
        //    for (var k of temp) { 
        //        if (k !== temp[0]) increment = 0;
        //    }
        //    counter += increment;
        //}
    //}
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const s = readLine();

    const result = substrCount(n, s);

    ws.write(result + '\n');

    ws.end();
}
