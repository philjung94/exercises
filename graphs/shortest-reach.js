var fs = require('fs');
var _input = '' + fs.readFileSync('./shortest-reach-data-2.txt');
processData(_input);

function LinkedList (head, tail) {
    this.head = head;
    this.tail = tail;
    this.pop = (function () {
        if (this.head && this.head.next) {
            var temp = this.head;
            this.head = this.head.next;
            return temp;
        } else if (this.head && !this.head.next){
            var temp = new Node(this.head.data, undefined);
            this.head = undefined;
            this.tail = undefined;
            return temp;
        }
    }).bind(this);
    this.push = (function (node) {
        var temp = node;
        if (this.tail) {
            this.tail.next = temp;
        } else {
            this.head = temp;
        }
        this.tail = temp;
    }).bind(this);
}

/*
 Why doesn't prototype work here?
 some hoisting issue?
*/

function Node (data, next) {
    this.data = data;
    this.next = next;
}

function getReach(n, m, edges, head) {
    //console.log(n, m, edges, head);
    var graph = {};
    var i = 1;
    while (i <= n) {
        graph[i] = [];
        i++;
    }
    //console.log(graph);
    for (var [n1, n2] of edges) {
        //console.log(n1, n2);
        if (!graph[n1] || !graph[n2]) {
            console.log('n1, n2', n, m, graph, n1, n2);
        }
        graph[n1].push(n2);
        graph[n2].push(n1);
    }
    //console.log(graph);
    var graphClone = { ...graph };
    delete graphClone[head];
    var visited = {};
    //var toVisit = [{value: head, dist: 0}];
    var headNode = new Node({value: head, dist: 0}, undefined);
    var toVisit = new LinkedList(headNode, headNode);
    i = 1;
    console.log(toVisit);
    while (toVisit.head) {
        //var currNode = toVisit.shift();
        var currNode = toVisit.pop();
        var curr = currNode.data.value;
        if (visited[curr]) {
            continue;
        }
        visited[curr] = 6 * parseInt(currNode.data.dist);
        for (var node of graph[curr]) {
            if (!visited[node]) {
                toVisit.push(new Node({value: node, dist: parseInt(currNode.data.dist) + 1}));
                delete graphClone[node];
            }
        }
        i++;
    }
    i = 0;
    delete visited[head];
    var keys = Object.keys(graphClone);
    while (i < keys.length) {
        visited[keys[i]] = -1;
        i++;
    }
    var distanceKeys = Object.keys(visited).sort(function (a, b) {
        return Number(a) - Number(b);
    });
    //console.log('visited', visited);
    var result = [];
    for (var k of distanceKeys) {
        result.push(visited[k]);
    }
    //console.log('result,', result);
    return result;
}

function processData(input) {
    //Enter your code here
    var data = input.split('\n');
    var queries = parseInt(data.shift());
    var i = 0;
    var n = 0;
    var m = 0;
    var offset = 0;
    var results = [];
    while (i < queries) { 
        var graphData = data[offset].split(' ');
        n = Number(graphData[0]);
        m = Number(graphData[1]);
        var j = 1;
        var edges = [];
        console.log('j , m,  offset , data :::', j, m, offset);
        while (j < (m + 1)) { 
            //console.log('j , m,  offset , data :::', j, m, offset, data);
            edges.push(data[j + offset].split(' '));
            j++;
        }
        var s = data[j + offset];
        results.push(getReach(n, m, edges, s));
        offset += (m + 2);
        i++;
    }
    console.log(results);
} 

//process.stdin.resume();
//process.stdin.setEncoding("ascii");
//_input = "";
//process.stdin.on("data", function (input) {
//    _input += input;
//});
//
//process.stdin.on("end", function () {
//   processData(_input);
//});


