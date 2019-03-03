var fetch = require('node-fetch');
(function thousandRequests () {
    var reqs = [];
    for (var i = 0; i < 1000; i++) {
        var p = new Promise((resolve,reject) => {
            fetch('https://jsonplaceholder.typicode.com/photos/' + i)
            .then(resolve)
            .catch(reject)
            ;
        });
        reqs.push(p);
    }
    return reqs.forEach(p => {
        return p.then(console.log);
    });
})();
