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

  findEdge(nodeName, targetNodeName) {
    if (this.adjacencyList.has(nodeName)) {
      return this.adjacencyList.get(nodeName).find((element, index, array) => {
      return element[0] === targetNodeName;
    }) || "NO SUCH ROUTE";
    } else {
      return "NO SUCH NODE";
    }
  }

  findAdjacentNodes(nodeName) {
    const node = this.findNode(nodeName);
    if (node) {
      return this.adjacencyList.get(node);
    } else {
      return [];
    }
  }
  
  findNode(nodeName) {
    return this.nodes.find((element, index, array) => {
      return element === nodeName;
    }) || null;
  }

  calculateEdgeWeight(nodes) {
    var edgeWeight = 0;
    for (let i = 0; i < nodes.length - 1; i++) {
      let edge = this.findEdge(nodes[i], nodes[i + 1]);
      if (edge === 'NO SUCH ROUTE') { return edge; }
      edgeWeight += edge[1];
    }
    return edgeWeight;
  }

  shortestDistance(startNode, endNode) {
    const NOT_DISCOVERED = 0,
          DISCOVERED = 1;

    let status = [],
        shortestDistances = [],
        queue = [];
    
    queue.push(startNode);
    
    for (let node of this.nodes) {
      shortestDistances[node] = null;
      status[node] = NOT_DISCOVERED;
    }

    while (queue.length > 0) {
      let activeNode = queue.shift();
      let adjacentNodes = this.adjacencyList.get(activeNode);
      for (let adjacentNode of adjacentNodes) {
        if (status[adjacentNode[0]] === NOT_DISCOVERED) {
          status[adjacentNode[0]] = DISCOVERED;
          shortestDistances[adjacentNode[0]] = shortestDistances[activeNode] + adjacentNode[1];
          queue.push(adjacentNode[0]);
        }
      }
    }
    
    return shortestDistances[endNode];
  }

  totalPaths(startNode, endNode, maximum = 10) {
    var paths = [];
    var adjacencyList = this.adjacencyList;
    
    exploreNode(startNode);
   
    function exploreNode(activeNode, stops) {
      stops = stops || activeNode;
      let adjacentNodes = adjacencyList.get(activeNode);
      for (let adjacentNode of adjacentNodes) {
        let currentPath = stops + adjacentNode[0];
        if (stops.length < maximum + 1) {
          if (adjacentNode[0].endsWith(endNode)) {
            paths.push(currentPath);
          }
          exploreNode(adjacentNode[0], currentPath);
        }
      }
    }

    return paths.length;
  }

  totalPathsExactLength(startNode, endNode, exactLength) {
    var paths = [];
    var adjacencyList = this.adjacencyList;
    
    exploreNode(startNode);
   
    function exploreNode(activeNode, stops) {
      stops = stops || activeNode;
      let adjacentNodes = adjacencyList.get(activeNode);
      for (let adjacentNode of adjacentNodes) {
        let currentPath = stops + adjacentNode[0];
        if (stops.length <= exactLength + 1) {
          if (adjacentNode[0].endsWith(endNode) &&
              currentPath.length === exactLength + 1) {
            paths.push(currentPath);
          }
          exploreNode(adjacentNode[0], currentPath);
        }
      }
    }

    return paths.length;
  }


  totalWeightedPaths(startNode, endNode, maximumDistance = 30) {
    var paths = [];
    var adjacencyList = this.adjacencyList;

    exploreNode(startNode);
    
    function exploreNode(activeNode, stops, distance = 0) {
      stops = stops || activeNode;
      let adjacentNodes = adjacencyList.get(activeNode);
      for (let adjacentNode of adjacentNodes) {
        let currentPath = stops + adjacentNode[0];
        let currentDistance = distance + adjacentNode[1];
        if (currentDistance < maximumDistance) {
          if (adjacentNode[0].endsWith(endNode)) {
            paths.push([currentPath, currentDistance]);
          }
          exploreNode(adjacentNode[0], currentPath, currentDistance);
        }
      }
    }
    
    return paths.length;
  }
  
}

export default Graph;

let graph = new Graph;
const nodes = [ 'A', 'B', 'C', 'D', 'E' ];
for (let node of nodes) {
  graph.addNode(node);
}

graph.addEdge('A', 'B', 5);
graph.addEdge('B', 'C', 4);
graph.addEdge('C', 'D', 8);
graph.addEdge('D', 'C', 8);
graph.addEdge('D', 'E', 6);
graph.addEdge('A', 'D', 5);
graph.addEdge('C', 'E', 2);
graph.addEdge('E', 'B', 3);
graph.addEdge('A', 'E', 7);

console.log(graph.shortestDistance('A', 'C'));
