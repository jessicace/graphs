class Graph {
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
    var string = '';
    for (let node of this.nodes) {
      string += `${node} => `;
      let adjacentNodes = this.adjacencyList.get(node);
      for (let adjacentNode of adjacentNodes) {
        string += `${adjacentNode[0]}(${adjacentNode[1]}) `;
      }
      string += '\n';
    }
    return string;
  }
}

export default Graph;
