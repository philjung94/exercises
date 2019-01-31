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

function checkqq (qq, node) {
    for (let q of qq) {
        if ((node.level === q.value) || (node.level % q.value === 0)) {
            q.nodes.push(node);
        }
    }
}

/*
 * Complete the swapNodes function below.
 */
function swapNodes(indexes, queries) {

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
    for (let i of qq) {
        if (i.value === 1) {
            i.nodes.push(root);
        }
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
                    checkqq(qq, k);
                    currList.push(k);

                }

            }

            (q.values.length > 0) && i++;

        }

        l++;
        q.values = q.values.concat(currList);

    }

    /*
     * We need to traverse the tree until we reach the 
     * level of a query, then swap the child nodes of
     * all nodes in that level, then print the entire tree
     * via inOrder.
     */

    var result = [];
    console.log('qq', qq[0], qq[1]);
    for (let q of qq) {
        for (let node of q.nodes) {
            var temp = node.left;
            node.left = node.right;
            node.right = temp;
        }
        result.push(inOrderPrint(root));
    }

    console.log('result', result);
    return result;
}

function inOrderPrint (root) {
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
