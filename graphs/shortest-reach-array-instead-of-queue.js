function getReach(n, m, edges, head) {
    var graph = {};
    var i = 1;
    while (i <= n) {
        graph[i] = [];
        i++;
    }
    for (var [n1, n2] of edges) {
        graph[n1].push(n2);
        graph[n2].push(n1);
    }
    var graphClone = { ...graph };
    delete graphClone[head];
    var visited = {};
    var toVisit = [{ value: head, dist: 0}];
    i = 1;
    while (toVisit.length) {
        var currNode = toVisit.shift();
        var curr = currNode.value;
        if (visited[curr]) {
            continue;
        }
        visited[curr] = currNode.dist * 6;
        for (var node of graph[curr]) {
            if (!visited[node]) {
                toVisit.push({value: node, dist: currNode.dist + 1});
                delete graphClone[node];
            }
        }
        i++;
    }
    delete visited[head];
    i = 0;
    var keys = Object.keys(graphClone);
    while (i < keys.length) {
        visited[keys[i]] = -1;
        i++;
    }
    var distanceKeys = Object.keys(visited).sort(function (a, b) {
        return Number(a) - Number(b);
    });
    var result = [];
    for (var k of distanceKeys) {
        result.push(visited[k]);
    }
    return result;
}

function processData(input) {
    //Enter your code here
    var data = input.split('\n');
    var queries = parseInt(data.shift());
    var i = 0;
    var n = 0;
    var m = 0;
    var results = [];
    var offset = 0;
    while (i < queries) {
        var graphData = data[offset].split(' ');
        n = Number(graphData[0]);
        m = Number(graphData[1]);
        var j = 1;
        var edges = [];
        while (j < (m + 1)) {
            edges.push(data[j + offset].split(' '));
            j++;
        }
        var s = data[j + offset];
        results.push(getReach(n, m, edges, s));
        i++;
        offset += (m + 2);
    }
    i = 0;
    while (i < results.length) { 
        results[i] = results[i].join(' ');
        i++;
    }
    console.log(results.join('\n'));
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});


