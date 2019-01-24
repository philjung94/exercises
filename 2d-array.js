'use strict';

// Complete the hourglassSum function below.
function hourglassSum(arr) {
    let i, j, k, l, sum = 0, max = 0;
    for (i = 0; i < (arr.length - 2); i++) { 
        for (j = 0; j < (arr[i].length - 2); j++) { 
            for (k = i; k < i + 3; k++) { 
                for (l = j; l < j + 3; l++) { 
                    if (l === j + 1) {
                        if (k === i + 1) {
                            sum += arr[k][j];
                        }
                    } else { 
                        sum += arr[k][j];
                    }
                }
            }
            console.log('sum ::\t', sum, '\n');
            if (sum > max) { 
                max = sum;
            }
            sum = 0;
        }
    }
    return max;
}

