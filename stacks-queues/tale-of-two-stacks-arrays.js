function Stack() { 
    this.values = [];
}

Stack.prototype.push = function (x) { 
    this.values.push(x);
}

Stack.prototype.pop = function() { 
    return this.values.pop();
}
Stack.prototype.peek = function () { 
    if (this.values.length) {
        return this.values[this.values.length - 1];
    } else { 
        return;
    }
}

function processData(input) {
    //Enter your code here
    var str = input.split('\n');
    var queries = str[0];
    var s1 = new Stack();
    var s2 = new Stack();
    for (var i = 1; i < str.length; i++) { 
        switch (parseInt(str[i][0])) { 
            case 1:
                var curr = parseInt(str[i].split(' ')[1]);
                s1.push(curr);
                s2.values = s1.values.slice().reverse();
                break;
            case 2:
                s2.pop();
                s1.values = s2.values.slice().reverse();
                break;
            case 3:
                s2.values = s1.values.slice().reverse();
                console.log(s2.peek());
                break;
            default:
                break;
        }
    }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});

