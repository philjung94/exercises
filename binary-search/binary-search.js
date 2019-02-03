
function binarySearch(arr, x) { 
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) { 
        let mid = left + Math.floor((right + left) / 2);
        if (arr[mid] === x) return mid;
        else if (x < arr[mid]) right = mid - 1;
        else left = mid + 1;
        return binarySearch(arr.slice(left, right));
    }
    return left;
}

console.log(binarySearch([1, 2, 3, 10], 10));
