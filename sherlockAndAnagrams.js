String.prototype.reverse = function () {
    var str = '';
    for (let char of this) {
        str = char.concat(str);
    }
    return str;
}

function sherlockAndAnagrams (s) {
    var hashMap = {}, i = 0, j = 0, counter = 0;
    while (i < s.length) {
        while (j < s.length - i) {
            var temp = s.slice(i, i + ++j);
            if (hashMap[temp.length]) hashMap[temp.length].push(temp);
            else hashMap[temp.length] = [temp];
        }
        j = 0;
        i++;
    } 
    console.log(hashMap);
    for (let key in Object.keys(hashMap)) {
        if (hashMap[key]) {
            var tempArr = [];
            i = 0;
            while (i < hashMap[key].length) {
                var tempMap = {};
                var temp = hashMap[key][i];
                for (let c of temp) {
                    if (tempMap[c]) tempMap[c]++;
                    else tempMap[c] = 1;
                }
                tempArr.push(tempMap);
                i++;
            }
            /*
             * This can be optimised via .sort(),
             * after which we can just count the frequency
             * of each substring.
            */
            while (tempArr.length) {
                var temp = tempArr.shift();
                console.log('temp', temp);
                for (let cv of tempArr) {
                    if (Object.keys(cv).every(function (key) {
                        return cv[key] === temp[key];
                    })) {
                        counter++;
                    }
                }
            }
        }
    }
    return counter;
}

console.log(sherlockAndAnagrams('kkkk'));
