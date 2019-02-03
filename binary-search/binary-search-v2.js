function binarySearch (arr, x, l, r) {
    var m = Math.floor((l + r) / 2);
    if (x === arr[m]) return [m, m];
    if (r - l === 1) return [l, r];
    if (x > arr[m]) return binarySearch(arr, x, m + 1, r);
    if (x < arr[m]) return binarySearch(arr, x, l, m);
}

console.log(binarySearch([1, 2, 3, 10], 10, 0, 4));
