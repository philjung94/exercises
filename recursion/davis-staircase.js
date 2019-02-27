console.log(permute(2,2));
var r = -1;
function stepPerm(n) {
    if (n === 1) return 1;
    (r < 2) && r++;
    return permute(n, r) + stepPerm(n - 1);
}

function permute(n, r){
    return factorial(n) / factorial(n-r);
}

function factorial (n) {
    if (n === 0) return 1;
    return n*factorial(n-1);
}

//function permute(n, r) {
//    var numerator = n;
//    var denominator = n - r;
//    while (n - r > 1) {
//        n--;
//        numerator *= n;
//        denominator *= (n - r);
//    }
//    while (n > 1) {
//        n--;
//        numerator *= n;
//    }
//    return numerator / denominator;
//}

//function factorialTR (n) {
//    function iter(acc, n) {
//        if (n === 0) return acc;
//        return iter(acc * n, n-1);
//    }
//    return iter(1, n);
//}
//
