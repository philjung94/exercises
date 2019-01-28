function whatFlavors(cost, money) {
    var m = new Map();
    var flavors = [];
    for (let i in cost) {
        if (m.has(money - cost[i])) {
            return [Number(i) + 1, m.get(money - cost[i]) + 1]
                .sort(function (a, b) {
                    return a - b;
                });
        }
        m.set(cost[i], Number(i));
    }
}
console.log(whatFlavors([1, 4, 5, 2, 1], 5));
