const hello = {
    hello: "weo"
};

//// This will mutate the original
//function worldIt(hello) {
//    hello.world = "wow";
//}
//worldIt(hello);
//console.log(hello);
//
//// This will not mutate the original
//function worldIt2(hello) {
//    hello =  '';
//}
//worldIt2(hello);
//console.log(hello);

// This will not mutate the original
function worldIt3(wow) {
    wow = {
        man: "do",
    };
}
worldIt3(hello);
console.log(hello);

var world = [];

// This will mutate the original
function worldIt4(wwow) {
    wwow.push('hmm');
}

worldIt4(world);
console.log(world);

const world2 = [];

// This will mutate the original
function worldIt5(wwow) {
    wwow.push('hmm');
}

worldIt5(world2);
console.log(world2);

