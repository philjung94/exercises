var str = require('./count-triplets-massive-string.js');

function isInteger (n) {
    return n % 1 <= 0.000001;
}

function countTriplets(arr, r) {
    var curr = [], i = 0, counter = 0;
    var hashMap = arr.reduce(function (acc, cv) { 
        if (acc[cv]) acc[cv]++;
        else acc[cv] = 1;
        return acc;
    }, {});
    console.log(hashMap);
    for (var key of Object.keys(hashMap)) {
        var val = Number(key);
        if (!isInteger((Math.log(val) / Math.log(r)))) {
            console.log('not fit', val,(Math.log(val) / Math.log(r)) );
            continue;
        }
        for (let v of [val, val * r, val * r * r]) { 
            if (!hashMap[v]) {
                curr.push(0);
                break;
            }
            curr.push(hashMap[v]);
        }
        console.log('curr: ', curr);
        counter += curr.reduce(function (acc, cv) {
            acc *= cv;
            return acc;
        }, 1);
        curr = [];
    }
    console.log(counter);

    return counter;
}

console.log(countTriplets(str.split(' '), 3));
