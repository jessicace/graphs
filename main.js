import fs from 'fs';
import Graph from './Graph';

const input = process.argv[2] || 'input.txt';

fs.readFile(input, 'utf8', (error, data) => {
  if (error) { console.error(error); }
  let graph = generateGraphFromData(data.trim().split(", "));
  printGraphData(graph);
});

/**
 *  Takes in (an array of) string(s) in the format of "AB1", where the first
 *  character is town A, the second character is town B, and the last
 *  character is the distance between the two towns.
 *  @param { Array } routes
 *  @return { Graph } graph
 */
function generateGraphFromData(routes) {
  let graph = new Graph;
  for (let route of routes) {
    if (!graph.nodes.includes(route[0])) {
      graph.addNode(route[0]);
    }
    graph.addEdge(route[0], route[1], route[2]);
  }
  return graph;
};

/**
 *  Return some miscellaneous information from test file.
 *  
 */
function printGraphData(graph) {
  console.log("Train stations: ");
  for (let node of graph.nodes) {
    console.log(node);
    console.log("Routes: ");
    for (let adjacentNode of graph.adjacencyList.get(node)) {
      console.log(`====> ${adjacentNode[0]}(${adjacentNode[1]})`);
    }
  }
}
