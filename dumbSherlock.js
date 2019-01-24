String.prototype.reverse = function () { 
    var str = '';
    for (let char of this) { 
        str = char.concat(str);
    }
    return str;
}

// Complete the sherlockAndAnagrams function below.
// dumb shit kept here on purpose
function sherlockAndAnagrams(s) {
    var hashMap = {}, i = 0, x = 0, str;
    while (i < s.length) { 
        str = '';
        if (hashMap[i] !== s[i]) {
            for (let c of s.slice(i, s.length)) { 
                str += c;
                var startIndex = i + 1;
                var rest = s.slice(startIndex, s.length); 
                var matchIndex = rest.indexOf(str.reverse());
                if (matchIndex !== -1) {
                    hashMap[startIndex + matchIndex] = str.reverse();
                    x++;
                }
            }
        }
        i++;
    }
    console.log(hashMap);
    return x;
}

console.log(sherlockAndAnagrams('abba'));
