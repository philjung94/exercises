
console.log(maxSubsetSum([3, 5, 1, 8, 10]));

function maxSubsetSum(arr) {
    var max = [arr[0]];
    max.push(Math.max(arr[1], arr[0]));
    for (let i = 2; i < arr.length; i++) {
        max.push(Math.max(max[i - 1], max[i - 2] + arr[i], arr[i]));
    }
    return max[max.length - 1];
}

