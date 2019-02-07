'use strict';

const fs = require('fs');

let inputString = '' + fs.readFileSync('./nearest-node-data.txt');
let currentLine = 0;

inputString = inputString.split('\n');

main();

function readLine() {
    return inputString[currentLine++];
}

// Complete the findShortest function below.

/*
 * For the unweighted graph, <name>:
 *
 * 1. The number of nodes is <name>Nodes.
 * 2. The number of edges is <name>Edges.
 * 3. An edge exists between <name>From[i] to <name>To[i].
 *
 */
function findShortest(graphNodes, graphFrom, graphTo, ids, val) {
    var i = 0;
    var n = graphNodes;
    var m = graphFrom.length;
    var h = {};

    var head;

    function Node (id, adjacent = [], color = -1, prev = -1) {
        this.id = id;
        this.adjacent = adjacent;
        this.color = color;
        this.prev = prev;
    }

    function insert (key, nodeId) {
        if (h[key]) {
            h[key].adjacent.push(nodeId);
        } else {
            h[key] = new Node(key, [nodeId]);
        }
    }
    
    while (i < n || i < m) {
        if (i < m) {
            insert(graphFrom[i], graphTo[i]);
            insert(graphTo[i], graphFrom[i]);
        }
        if (i < n) {
            var color = ids[i];
            var id = i + 1;
            if (color === val) {
                head = id;
            }
            if (h[id]) {
                h[id].color = color;
            } else {
                h[id] = new Node(id, [], color);
            }
        }
        i++;
    }
    console.log(h);

    var keys = Object.keys(h);
    var visited = {};
    head = keys.find(function (cv) {
        return h[cv].color === val;
    });
    if (!head) return -1;
    var toVisit = [head];

    var matches = [];

    while (toVisit.length) {

        var curr = toVisit.shift();

        if (visited[curr]) {
            continue;
        }

        visited[curr] = true;

        if (curr !== head && h[curr].color === val) {
            matches.push(curr);
        }

        for (var node of h[curr].adjacent) {
            if (!visited[node]) {
                toVisit.push(node);
                h[node].prev = curr;
            }
        }

    }

    if (!matches.length) {
        return -1;
    }

    var min = Number.MAX_SAFE_INTEGER;
    while (matches.length) {
        var match = matches.pop();
        var curr = match;
        var counter = 1;
        curr = h[curr].prev;
        while (h[curr].color !== val) {
            curr = h[curr].prev;
            counter++;
        }

        if (counter < min) min = counter;
    }

    return min;

}

function main() {

    const graphNodesEdges = readLine().split(' ');
    const graphNodes = parseInt(graphNodesEdges[0], 10);
    const graphEdges = parseInt(graphNodesEdges[1], 10);

    let graphFrom = [];
    let graphTo = [];

    for (let i = 0; i < graphEdges; i++) {
        const graphFromTo = readLine().split(' ');

        graphFrom.push(parseInt(graphFromTo[0], 10));
        graphTo.push(parseInt(graphFromTo[1], 10));
    }

    const ids = readLine().split(' ').map(idsTemp => parseInt(idsTemp, 10));

    const val = parseInt(readLine(), 10);

    const ans = findShortest(graphNodes, graphFrom, graphTo, ids, val);

    console.log(ans);


}

