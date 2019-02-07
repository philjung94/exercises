
function largestSubArray (arr, k) {
    var left = 0, right = 0, max = 0, sum = 0;

    while (left <= arr.length) {
        /*
         * 1) Expand the window to the right
         * until the sum reaches k.
         *
         * 2) We can keep the sum from the previous
         * calculation
        */
        while (sum + arr[right + 1] <= k) {
            sum += arr[right++];
        }

        if (right - left + 1 > max) {
            max = right - left + 1;
        }

        sum -= arr[left];

        /*
         * Shrink the window from the left
         */
        left++;

    }

    return max;

}

console.log(largestSubArray([1, 2, 3, 4, 10, 2, 3, 3], 10));
