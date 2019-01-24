var str = require('./count-triplets-massive-string.js');

Array.prototype.multiplyAll = function () {
    return this.reduce(function (acc, cv) {
        return acc *= cv;
    }, 1);
}

function countTriplets (arr, r) {
    let h = {};
    for (let i of arr) {
        /*
         * This data structure defines the keys of hashmap h as
         * the array elements, and the values as the corresponding
         * arrays of size frequency(element), frequency(element * r),
         * frequency(element * r * r)
        */
        if (h[i]) h[i][0]++;
        else h[i] = [1, 0, 0];
        let d = i;
        for (let j of [0, 1]) {
            d /= r;
            if (d % 1 === 0) {
                if (h[d]) h[d][j+1]++;
                else {
                    h[d] = [0, 0, 0];
                    h[d][j+1]++;
                }
            }
        }
    }
    console.log(h);
    let counter = 0;
    for (let i of Object.keys(h)) {
        counter += h[i].multiplyAll();
    }
    return counter;
}

console.log(countTriplets([1, 2, 1, 2, 4], 2));
