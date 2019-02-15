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

// Complete the minTime function below.
function minTime(roads, machines) {
    var h = {};
    for (let [n1, n2, time] of roads) { 
        if (!h[n1]) h[n1] = [];
        if (!h[n2]) h[n2] = [];
        h[n1].push({
            index: n2,
            time,
        });
        h[n2].push({
            index: n1,
            time,
        });
    }
    // We need to block all combinations between machines
    // By using the shortest edge
    // There is one unique path between each node pair
    // Therefore DFS is appropriate
    // We can store the minEdge value between each pair
    
    var destroyed = {};

    function dfs (src, dst, minEdge, visited, toDestroy) {
        var currEdge = minEdge;
        var covered = 0;
        if (!visited[src]) {
            visited[src] = true;
            if (src === dst) {
                if (toDestroy) {
                    destroyed[toDestroy.src] = toDestroy.dst;
                    destroyed[toDestroy.dst] = toDestroy.src;
                }
                console.log(currEdge);
                return currEdge;
            }
            for (let node of h[src]) {
                if (!visited[node.index]) {
                    if (destroyed[src] === node.index) continue;
                    if (node.time < currEdge) {
                        currEdge = node.time;
                        toDestroy = {
                            src,
                            dst: node.index
                        };
                    }
                    covered += dfs(node.index, dst, currEdge, visited, toDestroy);
                }
            }
        }
        return covered;
    }
    var result = 0;
    var left = 1;
    var visited;
    for (let src of machines) {
        var arr = machines.slice(left, machines.length);
        for (let dst of arr) {
            if (destroyed[src] !== dst) {
                result += dfs(src, dst, Number.MAX_SAFE_INTEGER, {});
            }
        }
        left++;
    }
    return result;

}

function main() {
    const ws = fs.createWriteStream('./output');

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    let roads = Array(n - 1);

    for (let i = 0; i < n - 1; i++) {
        roads[i] = readLine().split(' ').map(roadsTemp => parseInt(roadsTemp, 10));
    }

    let machines = [];

    for (let i = 0; i < k; i++) {
        const machinesItem = parseInt(readLine(), 10);
        machines.push(machinesItem);
    }

    const result = minTime(roads, machines);

    ws.write(result + '\n');

    ws.end();
}

