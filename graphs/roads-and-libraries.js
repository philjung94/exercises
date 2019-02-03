function roadsAndLibraries(n, c_lib, c_road, cities) {

    /*
    If the cost of a road is higher than the cost of a library,
    then return c_lib: cost of library times n: number of cities.
    */

    if (c_road >= c_lib) {
        return c_lib * n;
    }


    var h = new Map();

    for (let i = 1; i <= n; i++) {
        h.set(i, [])
    }

    function insert(node, neigh) {
        h.get(node).push(neigh)
    }

    for (let [n1, n2] of cities) {
        insert(n1, n2)
        insert(n2, n1)
    }

    var visited = {};
    var nodes = h.keys();
    function dfs(node) {
        var covered = 0;
        if (!visited[node]) {
            visited[node] = true;
            covered++;
            for (let neighbour of h.get(node)) {
                if (!visited[neighbour]) {
                    covered += dfs(neighbour);
                }
            }
        }
        return covered;
    }

    var edges = 0;
    var networks = 0;
    for (let node of nodes) {
        let networkSize = dfs(node)
        if (networkSize) {
            edges += networkSize - 1;
            networks++;
        }
    }

    return c_lib * networks + c_road * edges;
}
