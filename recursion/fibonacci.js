/*
 * Classic Fibonacci Recursion
 *
 * Dynamic Programming describes a number of techniques
 * to solve recursive algorithms. 
 *
 * The two basic tools are memoization and bottom-up.
 * They both serve to save time complexity that is the 
 * case with naive implementations of recursion.
 *
*/

console.log(fibonacci(10));
console.log(fibonacciDPMemo(10));
console.log(fibonacciDPBU(10));

//Naive implementation
function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

//DP - memo
function fibonacciDPMemo(n) {
    var memo = {};
    if (memo[n]) return memo[n];
    var temp  = fibonacci(n - 1) + fibonacci(n - 2);
    memo[n] = temp;
    return temp;
}

//DP - bottom up
function fibonacciDPBU (n) {
    var h = {};
    var i = 0;
    while (i <= n){
        if (i === 0) {
            h[i] = 0;
        } else if (i === 1) {
            h[i] = 1;
        } else {
            h[i] = h[i-1] + h[i-2];
        }
        i++;
    }
    return h[i - 1];
}
