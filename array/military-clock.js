function timeConversion(s) {
    /*
     * Write your code here.
     */
    var str = s.slice();
    var isAM = s[8] === 'A';
    var hours;
    if (isAM) {
        hours = parseInt(s[0] + s[1]);
        if (hours === 12) hours = 0;
    } else { 
        hours = parseInt(s[0] + s[1]);
        if (hours !== 12) hours += 12;
    }
    hours = '' + hours;
    if (hours.length < 2) { 
        hours = '0' + hours;
    }
    str = hours + str.substring(2, str.length - 2);
    return str;
}
console.log(timeConversion('12:45:54PM'));
