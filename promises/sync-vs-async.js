var fetch = require('node-fetch');
var promises = [
    new Promise(r => fetch('https://jsonplaceholder.typicode.com/photos/' + 1).then(r)),
    new Promise(r => fetch('https://jsonplaceholder.typicode.com/photos/' + 1).then(r)),
    new Promise(r => fetch('https://jsonplaceholder.typicode.com/photos/' + 2).then(r)),
    new Promise(r => fetch('https://jsonplaceholder.typicode.com/photos/' + 3).then(r)),
    new Promise(r => fetch('https://jsonplaceholder.typicode.com/photos/' + 4).then(r)),
    new Promise(r => fetch('https://jsonplaceholder.typicode.com/photos/' + 5).then(r)),
    new Promise(r => fetch('https://jsonplaceholder.typicode.com/photos/' + 6).then(r)),
    new Promise(r => fetch('https://jsonplaceholder.typicode.com/photos/' + 7).then(r)),
    new Promise(r => fetch('https://jsonplaceholder.typicode.com/photos/' + 8).then(r)),
    new Promise(r => fetch('https://jsonplaceholder.typicode.com/photos/' + 9).then(r)),
    new Promise(r => fetch('https://jsonplaceholder.typicode.com/photos/' + 10).then(r)),
];
(function syncVsAsync() {
    var a = [];
    var fn;
    promises.forEach(p => {
        p.then(result => {
            if (a.length > 10) {
                fn = Promise.resolve(a); 
            } else {
                a.push(result);
            }
        });
    });
    return new Promise(r => {
        setTimeout(() => fn && r(fn), 10000);
    }).then(console.log);
})();
