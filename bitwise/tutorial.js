console.log(getMaxLessThanK(5, 2));
function getMaxLessThanK(n, k) { 
    var a = 0;
    var b = 0;
    var max = 0;
    while (b < n) {
        while (a < n - 1) {
            if ((a & b) < k && (a & b) > max) {
                max = a & b;
            }
            a++;
        }
        b++;
        a = b - 1;
    }
    return max;
}
