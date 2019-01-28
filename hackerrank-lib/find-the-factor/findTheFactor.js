var fs = require('fs');
var path = require('path');
for (var i = 0; i < 13; i++) {
    var s = '0' + (i >= 10? i : ('0'+ i))  + '.txt';
    var input = 'input' + s;
    var output = 'output' + s;
    console.log('Test ' + i + ' : ' +input);
    var inputfile = ''+ fs.readFileSync(input);
    var outputfile = '' + fs.readFileSync(output);
    var result = findTheFactor(Number(inputfile.split('\n')[0]),Number(inputfile.split('\n')[1]));
    console.log('Result: ',result);
    console.log('Answer: ',outputfile);
    console.log('Test ' + (result == outputfile? 'passed' : 'failed'));
    if (result != outputfile) {
        console.log('Input: ', inputfile);
    }
}

function findTheFactor (n, p) {
    if (n === 1) {
        console.log('np', n, p);
        if (p === 1) return 1;
        else return 0;
    }
    var high = n % 2 === 0? n / 2  : n / 3;
    var i = 1;
    var arr = [];
    var arr2 = [];
    while (arr.length + arr2.length < p && i < high) {
        if (n % i === 0) {
            arr.push(i);
            /*
             * Tricky sleight of hand here
             * because if n has a square root
             * then it counts as one factor
             * not two!! This is an edge case
             * but one that is obvious for 
             * finding factors.
                * */
            if (i !== n / i) arr2.push(n / i);
            high = n / i;
        }
        i++;
    }
    arr = arr.concat(arr2.reverse());
    return p <= arr.length? arr[p - 1] : 0;
}

