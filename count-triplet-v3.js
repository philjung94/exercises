var str = require('./count-triplets-massive-string.js');

Array.prototype.multiplyAll = function () {
    return this.reduce(function (acc, cv) {
        return acc *= cv;
    }, 1);
}

function countTriplets (arr, r) {
    let h = {}, counter = 0;
    for (let i in arr) {
        if (h[arr[i]]) h[arr[i]].push(i);
        else h[arr[i]] = [i];
        if ((arr[i] / (r * r)) % 1 === 0) {
            console.log(h, arr[i]);
            let x = arr[i] / r, y = x / r;
            if (h[x] && h[y]) {
                for (let z of h[y]) {
                    counter += h[x].filter(function (cv) {
                        return cv > z;
                    }).length;
                }
            }
        }
    } 
    return counter;
}

console.log(countTriplets([1, 5, 5, 25, 125], 5));
