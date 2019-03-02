//function commonChild (a, b) {
//    var i = 0, am = {}, bm = {};
//    function insert(map, node, pos) {
//        map[node] && map[node].push(pos);
//        if (!map[node]) map[node] = [pos];
//    }
//    while (i < a.length) {
//        insert(am, a[i], i);
//        insert(bm, b[i], i);
//        i++;
//    }
//    for (var key of Object.keys(am)) {
//        if (bm[key]) {
//        }
//    }
//}



// AREYOU
// PLAYER

console.log(cc('areyou','player'))

function cc(s1, s2) {
    var result = [];
    for (var i = 0; i <= s1.length; i++) {
        result.push([]);
        for (var j = 0; j <= s2.length; j++) {
            var temp = 0;
            if (![i, j].some(cv => cv === 0)) {
                if (s1[i - 1] === s2[j - 1]) {
                    temp = result[i - 1][j - 1] + 1;
                } else {
                    temp = Math.max(result[i][j - 1], result[i - 1][j]);
                }
            }
            result[i].push(temp);
        }
    }
    return result;
}



