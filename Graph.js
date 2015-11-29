import Queue from './Queue';

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

  shortestDistanceSearch(startNode, endNode) {
    const NOT_DISCOVERED = -1,
          DISCOVERED = 0,
          EXPLORED = 1;
    // Keeps track of nodes visited
    let status = [],
        distance = [],
        pred = [];
    var queue = new Queue();
    queue.enqueue(startNode);
    

    for (let node of this.nodes) {
      distance[node] = 0;
      pred[node] = null;
      status[node] = NOT_DISCOVERED;
    }

    
    while (!queue.isEmpty()) {
      let activeNode = queue.dequeue();
      const adjacentNodes = this.adjacencyList.get(activeNode);
      // status[activeNode] = DISCOVERED;
      for (let adjacentNode of adjacentNodes) {
        if (status[adjacentNode[0]] === NOT_DISCOVERED) {
          status[adjacentNode[0]] = DISCOVERED;
          distance[adjacentNode[0]] = distance[activeNode] + adjacentNode[1];
          pred[adjacentNode[0]] = activeNode;
          queue.enqueue(adjacentNode[0]);
        }
      }
      // status[activeNode] = EXPLORED;
    }
    
    return distance[endNode];
  }

  shortestDistancesSearch(startNode) {
    const NOT_DISCOVERED = -1,
          DISCOVERED = 0,
          EXPLORED = 1;
    // Keeps track of nodes visited
    let status = [],
        distance = [],
        pred = [];
    var queue = new Queue();
    queue.enqueue(startNode);
    

    for (let node of this.nodes) {
      distance[node] = 0;
      pred[node] = null;
      status[node] = NOT_DISCOVERED;
    }

    
    while (!queue.isEmpty()) {
      console.log(queue);
      let activeNode = queue.dequeue();
      const adjacentNodes = this.adjacencyList.get(activeNode);
      // status[activeNode] = DISCOVERED;
      console.log('Active node: ' + activeNode);
      for (let adjacentNode of adjacentNodes) {
        console.log('adjacentNode: ' + adjacentNode);
        if (status[adjacentNode[0]] === NOT_DISCOVERED) {
          console.log('discovered: ' + adjacentNode[0]);
          status[adjacentNode[0]] = DISCOVERED;
          distance[adjacentNode[0]] = distance[activeNode] + adjacentNode[1];
          pred[adjacentNode[0]] = activeNode;
          queue.enqueue(adjacentNode[0]);
        }
      }
    }
    
    return {
      distances: distance,
      predecessors: pred
    };
  }

  paths(maximum = 4) {
    const NOT_DISCOVERED = -1,
          DISCOVERED = 0,
          EXPLORED = 1;

    let pred = [];
    var paths = [];
    var status = [];
    var adjacencyList = this.adjacencyList;

    
    // Keeps track of nodes visited
    for (let node of this.nodes) {
      for (let node of this.nodes) {
        status[node] = NOT_DISCOVERED;
      }
      exploreNode(node, node);
    }

    function exploreNode(parentNode, activeNode, stops) {
      stops = stops || [ activeNode ];
      let adjacentNodes = adjacencyList.get(activeNode);
      for (let adjacentNode of adjacentNodes) {
        let tempArray = [];
        tempArray.push(stops);
        tempArray.push(adjacentNode[0]);
        paths.push(tempArray.join(''));
        if (status[adjacentNode[0]] === NOT_DISCOVERED || stops.length < maximum) {
          status[adjacentNode[0]] = DISCOVERED;
          exploreNode(parentNode, adjacentNode[0], tempArray.join(''));
          status[adjacentNode[0]] = NOT_DISCOVERED;
        }
      }
    }

    return paths;
  }

  
  startEndMaximumStops(startNode, endNode, maximum) {
    let filteredPaths = this.paths().filter((element, index, array) => {
      return element.startsWith(startNode) &&
        element.endsWith(endNode) &&
        element.length <= maximum + 1;
    });
    return filteredPaths.length;
  }

  startEndExactStops(startNode, endNode, maximum) {
    let filteredPaths = this.paths().filter((element, index, array) => {
      return element.startsWith(startNode) &&
        element.endsWith(endNode) &&
        element.length === maximum + 1;
    });
    return filteredPaths.length;
  }

  totalWeightedPaths(startNode, endNode, maximumDistance = 30) {
    var paths = [];
    var adjacencyList = this.adjacencyList;

    exploreNode(startNode, startNode);
    
    function exploreNode(activeNode, stops, distance = 0) {
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


