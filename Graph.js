export default class Graph {
  constructor(nodes = []) {
    this.nodes = nodes;
    this.adjacencyList = new Map();
  }
  
  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList.set(node, []);
  }

  addEdge(startNode, endNode, weight) {
    this.adjacencyList
      .get(startNode)
      .push([endNode, weight]);
  }

  toString() {
    for (let node of this.nodes) {
      let string = '';
      string += `${node} => `;
      let adjacentNodes = this.adjacencyList.get(this.nodes[i]);
      for (let adjacentNode of adjacentNodes) {
        string += `adjacentNode`;
      }
    }
  }
}
