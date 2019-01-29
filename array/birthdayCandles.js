var fs = require('fs');
var data = '' + fs.readFileSync('./candles-data.txt');
var arr = data.split('\n')[1].split(' ');
function birthdayCakeCandles(ar) {
    var h = {};
    for (let i of ar) { 
        h[i] && h[i]++;
        if (!h[i]) h[i] = 1;
    }
    var max = 0;
    for (let i of Object.keys(h)) {
        if (Number(i) > max) max = Number(i);
    }
    return h[max];
}
console.log(birthdayCakeCandles(arr));

