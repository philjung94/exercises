/*
 * Couple of mistakes I made here:
 * 1) I checked for typeof x === 'Number'
 * Don't use this unless you know the output. It's 'Object' for objects and
 * 'number' for numbers
 * 2) I didn't check for whether c[next] existed in the else block.
 * This would increment the count variable which is returned in the end
 * As a result we always have a count 1 greater than the expected output.
*/

function isSafe(x) { 
    return typeof x === 'number' && x === 0;
}

// Complete the jumpingOnClouds function below.
function jumpingOnClouds(c) {
    let count = 0;
    let curr = 0;
    let next = 1;
    while (curr < c.length) { 
        if (isSafe(c[next])) {
            curr++;
            next++;
            count++;
            if (isSafe(c[next])) { 
                curr++;
                next++;
            }
        } else { 
            if (c[next]) {
                curr += 2;
                next += 2;
                count++;
            } else {
                break;
            }
        }
    }
    return count;
}

console.log(jumpingOnClouds([0, 0, 1, 0, 0, 0, 0, 1, 0, 0]));
