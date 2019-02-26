
/*
 * concept: triplet
 * three integers that form a geometric progression
 */


/*
 * @function countTriplets
 *
 * @param {Array} arr - An array of integers
 * @param {Number} r - The common ratio
 *
 */
function countTriplets (arr, r) {
    var curr, next, nextnext;
    var count = 0;
    var h = {
        map: {},
        insert (x) {
            if (this.map[x]) {
                this.map[x]++;
            } else {
                this.map[x] = 1;
            }
        },
        remove (x){
            if (this.map[x]) {
                this.map[x]--;
            } else {
                delete this.map[x];
            }
        },

    };
    for (var i of arr) h.insert(i);
    var s = new Set(arr);
    for (var i of s) {
        curr = h.map[i];
        if (curr) {
            next = h.map[i*r];
            if (next) {
                nextnext =h.map[i*r*r];
                if (nextnext) {
                    console.log(curr,next,nextnext);
                    count += curr * next * nextnext;
                }
            }
        }
    }
    return count;
}

console.log(countTriplets([1, 5, 5, 25, 125], 5));

/*
 * One way would be to iterate through the entire array for each element
 * and see if it can form a triplet, but obviously time complexity will suffer
 *
 * These are integers so a lookup is useful
 *
 * You would look up curr * r to see if that comes up
 *
 *
 * */
