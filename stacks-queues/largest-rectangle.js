function largestRectangle(h) {
    var left = 0;
    var right = 0;
    var max = 0;

    while (left < h.length) { 
        var len = right - left + 1;
        var min = h[left];
        var curr = len * min;
        console.log('curr', curr, left, right, min);
        if (right + 1 < h.length) {
            len++;
            right++;
        }
        if (h[right] < min) {
            min = h[right];
        }
        var nextMin = h[right];
        while (right < h.length && (len * min) > curr) { 
            curr = len * min;
            if (right + 1 < h.length) {
                len++;
                right++;
            }
            if (h[right] < min) {
                min = h[right];
            }
            if (h[right] < nextMin) { 
                nextMin = h[right];
            }
        }
        console.log(curr, min, left, right);
        if (curr > max) { 
            max = curr;
        }
        if (min !== nextMin) {
            // Then far left is min
            min = nextMin;
        } 
        left++;
	right = left;
    }
    return max;
}

console.log(largestRectangle(('8979 4570 6436 5083 7780 3269 5400 7579 2324 2116').split(' ').map(cv => parseInt(cv))));
