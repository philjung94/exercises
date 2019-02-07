'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the roadsAndLibraries function below.
function roadsAndLibraries(n, c_lib, c_road, cities) {
    if (c_road >= c_lib) {
        return c_lib * n;
    }
    var h = new Map();

    while (n > 0) {
        h.set(n--, []);
    }

    function insert(node, neigh) {
        h.get(node).push(neigh)
    }

    for (let [n1, n2] of cities) {
        insert(n1, n2)
        insert(n2, n1)
    }

    var toVisit = [];
    var visited = new Map();
    var networks = 0;
    var edges = 0;
    var i = 0;
    var keys = h.keys();

    while (h.size) {
        var head = keys.next().value;
        toVisit.push(head);
        networks++;
        var nodes = 0;
        while (i < toVisit.length) {
            var curr = toVisit[i++];
            if (visited.has(curr)) {
                continue;
            }
            visited.set(curr, 1);
            /*
            Array.prototype.concat() does not 
            modify the array but returns a new array
             */
            var temp = h.get(curr);
            for (let t of temp) {
                if (visited.has(t)) continue;
                toVisit.push(t);
            }
            nodes++;
            h.delete(curr);
        }
        edges += nodes - 1;
    }
    return c_lib * networks + c_road * edges;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const nmC_libC_road = readLine().split(' ');

        const n = parseInt(nmC_libC_road[0], 10);

        const m = parseInt(nmC_libC_road[1], 10);

        const c_lib = parseInt(nmC_libC_road[2], 10);

        const c_road = parseInt(nmC_libC_road[3], 10);

        let cities = Array(m);

        for (let i = 0; i < m; i++) {
            cities[i] = readLine().split(' ').map(citiesTemp => parseInt(citiesTemp, 10));
        }

        const result = roadsAndLibraries(n, c_lib, c_road, cities);

        ws.write(result + '\n');
    }

    ws.end();
}

