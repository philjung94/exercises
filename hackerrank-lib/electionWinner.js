function electionWinner(votes) {
    let max = 0, arr;
    let h = votes.reduce((acc, cv) => { 
        if (acc[cv]) {
            acc[cv]++;
        } else { 
            acc[cv] = 1;
        }
        if (max <= acc[cv]) max = acc[cv];
        return acc;
    }, {});
    arr = Object.keys(h).filter(cv => h[cv] === max).sort();
    return arr[arr.length - 1];
}
