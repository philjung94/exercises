function Node (node, next) {
    this.node = node;
    this.next = next;
}

function isNode (x) {
    return (x instanceof Node);
}

function compare (a, b) {
    return a - b;
}

function reducer (acc, cv, index) {
    acc[cv] = index;
    return acc;
}

function minimumSwaps (arr) {
    let sortedArr = [...arr].sort(compare).reduce(reducer, {}), 
        cycleEdges = 0, totalEdges = 0, i = 0, curr;
    while (i < arr.length) {
        if (!isNode(arr[i])) {
            curr = new Node(arr[i], sortedArr[arr[i]]);
            if (i === 0) arr[0] = curr;
            while (true) {
                console.log(curr);
                cycleEdges++;
                if (i === curr.next) break;
                if (isNode(arr[curr.next])) break;
                arr[curr.next] = new Node(arr[curr.next], sortedArr[arr[curr.next]]);
                curr = arr[curr.next];
            }
            totalEdges += cycleEdges - 1;
            cycleEdges = 0;
        }
        i++;
    }
    return totalEdges;
}
let arr = '2 31 1 38 29 5 44 6 12 18 39 9 48 49 13 11 7 27 14 33 50 21 46 23 15 26 8 47 40 3 32 22 34 42 16 41 24 10 4 28 36 30 37 35 20 17 45 43 25 19'.split(' ').map(cv => Number(cv));
console.log(minimumSwaps(arr));
