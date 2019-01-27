function processData(input) {
    var arrIn = input.split('\n');
    var currLine = 0;
    var TOTAL = 0, MEDIAN = 1;
    var days = arrIn[currLine++].split(' ').map(function(x) { return parseInt(x); });
    var numFraudDays = days[MEDIAN];
    var exps = arrIn[currLine++].split(' ').map(function(x) { return parseInt(x); });
    var notifs = 0;
    var compare_fn = function(a, b) {
        return a - b;
    };
    //console.log(days);
    //console.log(exps);
    
    var expDays = [...exps.slice(0, days[MEDIAN])];
    expDays.sort(function(a, b) { return a - b; });
    //console.log(expDays);
    //console.log('....TESTING....');
    
    for ( let i = days[MEDIAN]; i < days[TOTAL]; ++i ) {
        //process.stdout.write('old expDays=');
        //console.log(expDays);
        
        // get median for even
        let med = 0;
        if ( numFraudDays % 2 === 0 ) {
            med = (expDays[days[MEDIAN]/2] + expDays[(days[MEDIAN]/2)-1]);
        // get median for odd
        } else {
            med = expDays[Math.trunc(days[MEDIAN]/2)]*2;
        }
        
        // test if this day is greater than median and get notified
        if ( exps[i] >= med ) {
            notifs++;
//            if ( days[MEDIAN] % 2 === 0 ) {
//                console.log('med['+days[MEDIAN]/2+','+(days[MEDIAN]/2-1)+']=('+
//                    expDays[days[MEDIAN]/2]+' + '+expDays[(days[MEDIAN]/2)-1]+
//                    ')/2 = '+med);
//            } else {
//                console.log('med['+Math.floor(days[MEDIAN]/2)+']='+
//                    expDays[Math.floor(days[MEDIAN]/2)]); 
//            }
            //console.log('med='+med+', i='+i+', exps[i]='+exps[i]);
            //console.log('notifs='+notifs);
            //process.stdout.write('new expDays=');
            //console.log(JSON.stringify(expDays));
            //console.log('');
        }
        
        // update expDays, no need to sort... binary search where the new number goes
        // remove the last val of the original 
        var index = binarySearch(expDays, exps[i-numFraudDays], compare_fn);
        expDays.splice(index, 1);
        
        let val = exps[i];
        if ( val <= expDays[0] ) {
            expDays.unshift(val);
        } else if ( val > expDays[expDays.length-1] ) {
            expDays.push(val);
        } else {
            // binary search where to put new value
            let result = binarySearch(expDays, val, compare_fn);
            //console.log('val='+val+', result='+result);

            if ( result >= 0 ) {
                // value was found, insert into index result
                expDays.splice(result, 0, val);
            } else {
                // value wasn't found, insert into -m -1 return from binarySearch
                expDays.splice(-(result+1), 0, val);
            }
        }
        //console.log('med='+med+', i='+i+', exps[i]='+exps[i]);
        //console.log('notifs='+notifs);
        //process.stdout.write('new expDays=');
        //console.log(expDays);
        //console.log('');
    }
    console.log(notifs);
}

function binarySearch(ar, el, compare_fn) {
    var m = 0;
    var n = ar.length - 1;
    while ( m <= n ) {
        var k = ( n + m ) >> 1;
        var cmp = compare_fn(el, ar[k]);
        if ( cmp > 0 ) {
            m = k + 1;
        } else if ( cmp < 0 ) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return -m - 1;
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
