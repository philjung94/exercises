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

// Complete the maxRegion function below.
function maxRegion(grid) {
    var i = 0, j = 0;
    var hashmap = new Map();
    var offset = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
    ];
    console.log('grid', grid);

    while (i < grid.length) {
        while (j < grid[i].length) {
            if (grid[i][j] === 1) {
                var curr = [i, j];
                var currAdj = [];
                for (var [n1, n2] of offset) {
                    if (grid[i + n1] && grid[i + n1][j + n2] === 1) {
                        currAdj.push([i + n1, j + n2].join(','));
                    }
                }
                hashmap.set(curr.join(','), currAdj);
            }
            j++;
        }
        j = 0;
        i++;
    }


    var h = new Map(hashmap);
    var visited = new Map();
    var keys = h.keys();
    var max = 0;
    function dfs(key) {
        var covered = 0;
        if (!visited.has(key)) {
            covered++;
            visited.set(key, 1);
            var adj = h.get(key);
            h.delete(key);
            if (!adj) return 1;
            for (var node of adj) {
                if (!visited.has(node)) {
                    covered += dfs(node);
                }
            }
        }
        return covered;
    }
    while (h.size > 0) {
        var k = keys.next().value;
        var acc = dfs(k);
        if (acc > max) {
            max = acc;
        }
    }
    return max;

}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let grid = Array(n);

    for (let i = 0; i < n; i++) {
        grid[i] = readLine().split(' ').map(gridTemp => parseInt(gridTemp, 10));
    }

    const res = maxRegion(grid);

    ws.write(res + '\n');

    ws.end();
}

