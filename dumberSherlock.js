String.prototype.reverse = function () {
    var str = '';
    for (let char of this) {
        str = char.concat(str);
    }
    return str;
}

function sherlockAndAnagrams (s) {
    var x = 0, hashMap = {};
    for (let i in s) {
        var str = '';
        var clone = s.split('');
        clone.splice(i, 1);
        clone = clone.join('');
        for (let c of s.slice(i, s.length)) {
            str += c;
            if (str === s) break;
            if (hashMap[str]) break;
            console.log(clone, str, str.reverse());
            var reverse = str.reverse();
            if (clone.includes(reverse)) {
                hashMap[reverse] = str;
                x++
            };
        }
    }
    return x;
}




console.log(sherlockAndAnagrams('abcd'));
