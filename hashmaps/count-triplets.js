//const data = require('./count-triplet-data');
//const data = require('./triplet-data');

//var parsed = data.split('\n');
//var firstLine = parsed[0].split(' ');
//var r = firstLine[1];
//var arr = parsed[1].split(' ');
//

console.log(countTriplets([1,2,2,4], 2));


//@TODO Revise why the order of those functions mattered for r = 1


function countTriplets (arr, r) {
    var map = {};
    var paths = {};
    var count = 0;
    for (var i of arr) {
        var p1 = i / r;
        var p2 = p1 / r;
        if (paths[p1]) {
            count += paths[p1];
        }
        if (map[p1]) {
            if (paths[i]) {
                paths[i] += map[p1];
            } else {
                paths[i] = map[p1];
            }
        }
        map[i] && map[i]++;
        if (!map[i]) map[i] = 1;
    }
    return count;
}




/*
 * An array element node needs to be on the lookout for
 * itself * r
 * itself * r * r
 *
 * If the above cases are met then we count the triplet
 *
 * */
