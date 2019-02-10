function Node (value) {
    this.value = value;
}

Node.prototype.addNext = function (next) {
    this.next = next;
}

function Stack (top) {
    this.top = top;
}

Stack.prototype.push = function (node) {
    if (this.top) {
        var temp = node;
        temp.next = this.top;
        this.top = temp;
    } else {
        this.top = node;
    }
}

Stack.prototype.pop = function () {
    if (this.top.next) {
        var temp = this.top;
        this.top = this.top.next;
        temp.next = undefined;
        return temp;
    } else {
        var temp = this.top;
        temp.next = undefined;
        this.top = undefined;
        return temp;
    }
}

function Queue () {
    this.s1 = new Stack();
    this.s2 = new Stack();
}

Queue.prototype.enqueue = function (node) {
    while (this.s2.top) {
        this.s1.push(this.s2.pop());
        console.log('push', this.s2.top);
    }
    this.s1.push(node);
}

Queue.prototype.dequeue = function () {
    while (this.s1.top) {
        this.s2.push(this.s1.pop());
    }
    this.s2.pop();
}

Queue.prototype.peek = function () {
    while (this.s1.top) {
        this.s2.push(this.s1.pop());
        console.log('top', this.s1.top);
    }
    return this.s2.top.value;
}

var q = new Queue();
q.enqueue(new Node(1));
console.log(q.peek());
q.enqueue(new Node(3));
console.log(q.peek());
q.enqueue(new Node(3));
console.log(q.peek());
q.dequeue();
console.log(q.peek());


//function processData(input) {
//    //Enter your code here
//    var str = input.split('\n');
//    var queries = str[0];
//    var s1 = new Stack();
//    var s2 = new Stack();
//    for (var i = 1; i < str.length; i++) { 
//        switch (parseInt(str[i][0])) { 
//            case 1:
//                var curr = parseInt(str[i].split(' ')[1]);
//                s1.push(curr);
//                s2.values = s1.values.slice().reverse();
//                break;
//            case 2:
//                s2.pop();
//                s1.values = s2.values.slice().reverse();
//                break;
//            case 3:
//                s2.values = s1.values.slice().reverse();
//                console.log(s2.peek());
//                break;
//            default:
//                break;
//        }
//    }
//} 
//
//process.stdin.resume();
//process.stdin.setEncoding("ascii");
//_input = "";
//process.stdin.on("data", function (input) {
//    _input += input;
//});
//
//process.stdin.on("end", function () {
//   processData(_input);
//});
//
