function mergesort (arr, temp, leftStart, rightEnd) {
    if (leftStart >= rightEnd) return;
    var middle = Math.floor((leftStart + rightEnd) / 2);
    mergesort(arr, temp, leftStart, middle);
    mergesort(arr, temp, middle + 1, rightEnd);
    mergeHalves(arr, temp, leftStart, rightEnd);
}

function mergeHalves (arr, temp, leftStart, rightEnd) {
    var leftEnd = Math.floor((leftStart + rightEnd) / 2);
    var rightStart = leftEnd + 1;
    var left = leftStart;
    var right = rightStart;
    var index = leftStart;
    while (left <= leftEnd && right <= rightEnd) {
        if (arr[left] <= arr[right]) {
            temp[index] = arr[left];
            left++;
        } else {
            temp[index] = arr[right];
            right++;
        }
        index++;
    }
    while (left <= leftEnd) {
        temp[index++] = arr[left++];
    }
    while (right <= rightEnd) {
        temp[index++] = arr[right++];
    }
    var i = leftStart;
    while (i < (rightEnd - leftStart + 1)) {
        arr[i] = temp[i];
        i++;
    }
}

var arr = [5, 2, 3, 5, 1, 10, 43];
var temp = [];
mergesort(arr, temp, 0, 6);;
console.log('result', arr);
