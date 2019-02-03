function midpoint (l, r) {
    return Math.floor((l + r) / 2);
}

/*
 * This binary search returns the closest
 * possible indexes that correspond to x
 */

function binarySearch (arr, x, l, r) {
    var m = Math.floor((l + r) / 2);
    if (x === arr[m]) return [m, m];
    if (r - l === 1) {
        return [l, r];
    }
    if (x > arr[m]) return binarySearch(arr, x, m + 1, r);
    if (x < arr[m]) return binarySearch(arr, x, l, m);
}

function ascendingOrder (a, b) {
    return Number(a) - Number(b);
}

function median (values) {
    if(values.length ===0) return 0
    var half = Math.floor(values.length / 2);
    if (values.length % 2) return values[half];
    else return (values[half - 1] + values[half]) / 2.0;
}

function activityNotifications (exp, d) {
    var i = d;
    var arr = exp.slice(0, i).sort(ascendingOrder);
    var counter = 0;
        console.log(arr);
    while (i < exp.length) {
        var med = median(arr);
        if (exp[i] >= 2 * med) counter++;
        arr.shift();
        console.log('::', arr);
        var j = binarySearch(arr, exp[i], 0, arr.length - 1);
        console.log(j);
        var arrStart = i - d + 1;
        var values = [arr[j[0]], arr[j[1]]];
        console.log(values);
        if (values[0] > exp[i]) arr.splice((arrStart + j[0]), 0, exp[i]);
        else if (values[0] <= exp[i] && values[1] >= exp[i]) arr.splice(j[0] + 1, 0, exp[i]);
        else if (values[1] < exp[i]) arr.splice(j[1] + 1, 0, exp[i]);
        i++;
        console.log(arr);
    }
    console.log(counter);
    return counter;
}

activityNotifications([2, 3, 4, 2, 3, 6, 8, 4, 5], 5);
