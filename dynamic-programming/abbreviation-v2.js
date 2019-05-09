//console.log(abbreviation('aBbdD', 'BBD'));
//console.log(abbreviation('daBcd', 'ABC'));
console.log(abbreviation('beFgH', 'EFG'));
function isLower(x) {
    return x.toLowerCase() === x;
}

function dp(a, b, results, memo) {
    if (memo.has(`${a.length} ${b.length}`)) {
        return memo.get(`${a.length} ${b.length}`);
    }
    if (!a.length && !b.length) {
        results.add('YES');
        return 'YES';
    } else if (!b.length) {
        if (b.toLowerCase() !== b) {
            return 'NO';
        } else {
            results.add('YES');
            return 'YES';
        }
    } else if (!a.length) {
        results.add('NO');
        return 'NO';
    } else {
        var n1 = a[a.length - 1];
        var n2 = b[b.length - 1];
        if (n1 === n2) {
            a = a.slice(0, -1);
            b = b.slice(0, -1);
            if (!memo.has(`${a.length} ${b.length}`)) {
                memo.set(`${a.length} ${b.length}`, dp(a, b, results, memo));
            }
        } else if (n1.toUpperCase() === n2) {
            var tempA = a.slice(); 
            a = a.slice(0, -1);
            tempA = tempA.slice(0, -1);
            var tempB = b.slice(); // don't capitalize
            b = b.slice(0, -1);
            if (!memo.has(`${tempA.length} ${tempB.length}`)) {
                memo.set(`${tempA.length} ${tempB.length}`, dp(tempA, tempB, results, memo));
            }
            if (!memo.has(`${a.length} ${b.length}`)) {
                memo.set(`${a.length} ${b.length}`, dp(a, b, results, memo));
            }
        } else {
            if (isLower(a[a.length - 1])) {
                if (!memo.has(`${a.length} ${b.length}`)) {
                    a = a.slice(0, -1);
                    memo.set(`${a.length} ${b.length}`, dp(a, b, results, memo));
                }
            } else {
                results.add('NO');
                return 'NO';
            }
        }
    }
}

function abbreviation(a, b) {
    var results = new Set();
    var memo = new Map();
    dp(a, b, results, memo);
    return results.has('YES')? 'YES' : 'NO';
}
