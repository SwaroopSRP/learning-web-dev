type ListGraph = Record<string, string[]>; // === { [key: string]: string[] };
type State = [node: string, path: string[]];

function bfs(graph: ListGraph, start: string, goal: string): string[] | null {
    if (!(start in graph) || !(goal in graph)) {
        return null;
    }

    const queue: State[] = [[start, [start]]];
    const visited = new Set<string>([start]);

    while (queue.length) { // coz just queue -> array[], which are alway truthy in JS
        const [node, path] = queue.shift()!; // ! -> non-null assertion, coz loop condition guarantees that queue.shift() won't return undefined

        if (node === goal) {
            return path;
        }

        for (const neighbour of graph[node]!) { // ! -> to guarantee graph[node] exists at runtime
            if (!visited.has(neighbour)) {
                visited.add(neighbour);

                queue.push([neighbour, [...path, neighbour]]);
            }
        }
    }

    return null;
}


const g1: ListGraph = {
    "A": ["B", "C"],
    "B": ["D", "E"],
    "C": ["F"],
    "D": [],
    "E": ["F"],
    "F": []
};

console.log("BFS Shortest path analysis:");
console.log(bfs(g1, "A", "F"));


