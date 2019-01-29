function diagonalDifference(arr) {
    var l = arr.length - 1;
    /* 
     1 1 1
     1 1 1
     1 1 1
    */
    var i = 0;
    var j = 0;
    var accL = 0;
    var accR = 0;
    while (i <= l) { 
        while (j <= arr[i].length) { 
            if (j === i) accL += arr[i][j];
            if (j === l - i) accR += arr[i][j];
            j++;
        }
        j = 0;
        i++;
    }
    console.log(accL, accR);
    return Math.abs(accL - accR);
}


console.log(diagonalDifference([[11, 2, 4], [4, 5, 6], [10, 8, -12]]));
