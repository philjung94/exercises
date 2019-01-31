'use strict';

const fs = require('fs');
const util = require('util');

let inputString = '' + fs.readFileSync('swap-nodes-data-long.txt');
inputString = inputString.split('\n').map(str => str.trim());
let currentLine = 0;
main();

function readLine() {
    return inputString[currentLine++];
}

function Node (value) {
    this.value = value;
}

/*
 * Complete the swapNodes function below.
 */
function swapNodes(indexes, queries) {

    /*
     * Let's initialize a hashmap to store nodes
     * that match the query levels
     */

    var h = {};
    for (let query of queries) {
        if (!h[query]) h[query] = [[]];
        //h[query] = [];
    }


    /*
     * We will implement a queue to store the query values
     * and their respective nodes that we will append as we
     * insert into the tree
     */
    var qq = [];
    for (let query of queries) {
        qq.push({
            value: query,
            nodes: [],
        });
    }

    /*
     * We will push pointers to nodes
     * that are matched to the level.
    */

    console.log(indexes, queries);

    var root = new Node(1);
    root.level = 1;
    if (h[1]) {
        for (let q of queries) {
            if (q === 1) {
                h[1][h[1].length - 1].push(root);
                h[1].push([]);
            }
        };
    }

    /*
     * Insert tree nodes from input
     */

    var q = {
        values: [root],
        pop: function () {
            return this.values.shift();
        }
    };

    var l = root.level + 1;

    for (var i = 0; i < indexes.length; i++) {
        var currList = [];
        console.log('initialise q', q.values);
        while (q.values.length) {
            var curr = q.pop();
            console.log('Traverse to ', curr.value);
            var j = 0;
            curr.left = new Node(indexes[i][j++]);
            console.log('Insert Node ', curr.left.value, 'to the left');
            curr.right = new Node(indexes[i][j]);
            console.log('Insert Node ', curr.right.value, 'to the right');
            for (var k of [curr.left, curr.right]) {
                if (k.value !== -1) {
                    k.level = l;
                    currList.push(k);
                }
            }
            (q.values.length > 0) && i++;
        }
        l++;
        
        q.values = q.values.concat(currList);


        //.map(function (cv) {
        //   cv.level = l;
        //   for (let key of queries) {
        //       if (cv.level === Number(key)) {
        //           h[cv.level][h[cv.level].length - 1].push(cv);
        //           h[cv.level].push([]);
        //       } else if (cv.level % Number(key) === 0) {
        //           if (!h[cv.level / Number(key)]) h[cv.level / Number(key)] = [cv];
        //           else h[cv.level / Number(key)].push(cv);
        //       }
        //   }

            //if (h[cv.level]) h[cv.level].push(cv);
        //    return cv;
        //}));
    }

    /*
     * We need to traverse the tree until we reach the 
     * level of a query, then swap the child nodes of
     * all nodes in that level, then print the entire tree
     * via inOrder.
     */

    var result = [];
    var queryStack = queries.slice();
    while (queryList.length) {
        var temp = queryStack.shift();

    }


    for (let key of queries) {
        for (let nodeList of h[key]) {
            for (let node of nodeList) {
                var temp = node.left;
                node.left = node.right;
                node.right = temp;
            }
            result.push(inOrderPrint(root));
        }
    }
    //    for (let node of h[key]) {
    //        var temp = node.left;
    //        node.left = node.right;
    //        node.right = temp;
    //    }
    //}
    console.log('result', result);
    return result;
}

function inOrderPrint (root) {
    //var str = left.map(cv => cv.value).join(' ') + ' ' + right.map(cv => cv.value).join(' ');
    
    var arr = [];

    inOrder(root, arr);
    console.log(arr);
    return arr;
}

function inOrder (node, arr) {

    if (node.value === -1) return;
    inOrder(node.left, arr);
    arr.push(node.value);
    inOrder(node.right, arr);

}

function main() {

    const n = parseInt(readLine(), 10);

    let indexes = Array(n);

    for (let indexesRowItr = 0; indexesRowItr < n; indexesRowItr++) {
        indexes[indexesRowItr] = readLine().split(' ').map(indexesTemp => parseInt(indexesTemp, 10));
    }

    const queriesCount = parseInt(readLine(), 10);

    let queries = [];

    for (let queriesItr = 0; queriesItr < queriesCount; queriesItr++) {
        const queriesItem = parseInt(readLine(), 10);
        queries.push(queriesItem);
    }

    let result = swapNodes(indexes, queries);

}
