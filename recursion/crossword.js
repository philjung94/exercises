function crosswordPuzzle(crossword, hints) {
    var row = 0;
    var col = 0;
    var h = {};
    while (row < 10) {
        while (col < 10) {
            var currCol = col;
            while (crossword[row][col] === '-') {
                currCol++;
            }
            if (currCol !== col) {
                var len = currCol - col + 1;
                var node = {
                    head: [row, col],
                    tail: [row, currCol]
                };
                if (h[len]) {
                    h[len].push(node);
                } else {
                    h[len] = [node];
                }
            }
            col++;
        }
        col = 0;
        row++;
    }
}
