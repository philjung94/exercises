function bubbleSort(q) { 
    let count = 0, i = 0, curr, next, pass = false;
    while (!pass) {
        while (i < q.length) {
            curr = q[i];
            next = q[i+1];
            if (curr > next) { 
                q[i] = next;
                q[i+1] = curr;
                pass = false;
                count++;
            }        
            i++;
            if (i === q.length - 1) {
                if (!pass) {
                    i = 0;
                    pass = true;
                }             
            }
        }
    }
    return q;
}

console.log(bubbleSort([4, 3, 1, 2]));
