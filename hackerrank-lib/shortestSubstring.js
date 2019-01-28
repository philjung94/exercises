var fs = require('fs');
var path = require('path');
var data = fs.readFileSync(path.resolve(__dirname, './data/input012.txt'));

function shortestSubstring(s) {
    // Write your code here
    var hm = {};
    for (var i = 0; i < s.length; i++) {
        if (hm[s[i]]) {
            hm[s[i]]++;
        } else {
            hm[s[i]] = 1;
        }
    }
    var left = 0, right = 0, l = 0;
    var min = Number.MAX_SAFE_INTEGER;
    var end = false;
    while (!end) {
        left = l;
        right = left;
        var temp = {};
        while (Object.keys(temp).length < Object.keys(hm).length) {
            if (right >= s.length) {
                end = true;
                break;
            }
            if (!temp[s[right]]) temp[s[right]] = 1;
            else temp[s[right]]++;
            /*
             * We have to check if the key length is the same before we
             * increment right, otherwise the index will be inflated by 1
             * Even after we have the same number of keys
             *
             * We can implement this better, yes. But leaving it here 
             * for the sake of argument.
            */
            if (Object.keys(temp).length < Object.keys(hm).length) right++;
        }
        /*
         * We're now at the point where we have each unique key
         * Now, we shrink the left up to where we have enough of each key
         */
        while (temp[s[left]] > 1) {
            temp[s[left]]--;
            left++;
        }
        /*
         * This is the smallest possible substring when we start at index = l
         * Replace the min value of the last loop if smaller.
         */
        console.log(right, left);
        if (right - left + 1 < min) min = right - left + 1;
        l = left + 1;
        if (l > s.length - Object.keys(hm).length) break;
    }
    console.log('end');
    return min;
}

console.log(shortestSubstring(''+data));
//console.log(shortestSubstring('bab'));
