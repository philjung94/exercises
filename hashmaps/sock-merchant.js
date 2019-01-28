/*
 * The mistake I made was trying to 
 * increment on a value = 0;
 * A 0 value will not pass the validation
 * of whether a variable exists
 *  eval(acc[cv]) === 0
]*/

function sockMerchant(n, ar) {
    let sockMap = ar.reduce((acc, cv) => {
        console.log(acc[cv]);
        if (acc[cv]) {
            acc[cv]++;
            if (acc[cv] % 2 === 0) { 
                acc.totalPairs++;
            }
        } else { 
            acc[cv] = 1;
        }
        return acc;
    }, { totalPairs: 0 });
    return sockMap;
}

console.log(sockMerchant(9, [10, 20, 20, 10, 10, 30, 50, 10, 20]));
