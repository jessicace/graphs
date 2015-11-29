class Graph {
  
  /**
   *  Creates a new Graph object, initialised with an empty array of nodes.
   *  @return { Graph } graph
   */
  constructor() {
    this.nodes = [];
    this.adjacencyList = new Map();
  }

  /**
   *  Adds a node to the graph's node list.
   *  Initialises node in the graph's adjacencyList with an empty array.
   *  @param { String } node
   */
  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList.set(node, []);
  }

  /**
   *  Adds an edge with a weight between two nodes.
   *  @param { String } startNode
   *  @param { String } endNode
   *  @param { Number } weight
   */
  addEdge(startNode, endNode, weight) {
    this.adjacencyList
      .get(startNode)
      .push([endNode, weight]);
  }

  /**
   *  Finds existing edge based on the input of two node names.
   *  @param { String } startNode
   *  @param { String } endNode
   *  @return { }
   */
  findEdge(startNode, endNode) {
    return this.adjacencyList
      .get(startNode)
      .find((element, index, array) => {
        return element[0] === endNode;
      }) || null;
  }

  /**
   *  Finds existing node based on string input.
   *  @param { String } node
   *  @param { String } node
   */
  findNode(node) {
    return this.nodes
      .find((element, index, array) => {
        return element === node;
      }) || null;
  }

  /**
   *  Adds the edge weights based on the given path input.
   *  @param { Array } path
   *  @return { Number } edgeWeight
   */
  calculateEdgeWeight(path) {
    let edgeWeight = 0;
    for (let i = 0; i < path.length - 1; i++) {
      let edge = this.findEdge(path[i], path[i + 1]);
      if (edge === null) { return edge; }
      edgeWeight += edge[1];
    }
    return edgeWeight;
  }

  /**
   *  Given two nodes, calculate the lowest weighted path. 
   *  @param { String } startNode
   *  @param { String } endNode
   *  @return { Number } weight
   */
  lowestWeightedPath(startNode, endNode) {
    const NOT_DISCOVERED = 0,
          DISCOVERED = 1;

    let status = [],
        weight = [],
        queue = [];
    
    queue.push(startNode);
    
    for (let node of this.nodes) {
      weight[node] = null;
      status[node] = NOT_DISCOVERED;
    }

    while (queue.length > 0) {
      let activeNode = queue.shift();
      let adjacentNodes = this.adjacencyList.get(activeNode);
      for (let adjacentNode of adjacentNodes) {
        if (status[adjacentNode[0]] === NOT_DISCOVERED) {
          status[adjacentNode[0]] = DISCOVERED;
          weight[adjacentNode[0]] = weight[activeNode] + adjacentNode[1];
          queue.push(adjacentNode[0]);
        }
      }
    }
    
    return weight[endNode];
  }

  /**
   *  Given a start node and an end node, return the total number of paths
   *  less than or equal to the given size.
   *  Maximum path length given to prevent exceeding maximum stack size.
   *  @param { String } startNode
   *  @param { String } endNode
   *  @param { Number } maximumEdgeQuantity
   *  @return { Number } 
   *  
   */
  totalPaths(startNode, endNode, maximumEdgeQuantity = 10) {
    var paths = [];
    var adjacencyList = this.adjacencyList;
    
    exploreNode(startNode);
   
    function exploreNode(activeNode, stops) {
      stops = stops || activeNode;
      let adjacentNodes = adjacencyList.get(activeNode);
      for (let adjacentNode of adjacentNodes) {
        let currentPath = stops + adjacentNode[0];
        if (stops.length < maximumEdgeQuantity + 1) {
          if (adjacentNode[0].endsWith(endNode)) {
            paths.push(currentPath);
          }
          exploreNode(adjacentNode[0], currentPath);
        }
      }
    }

    return paths.length;
  }

  /**
   *  Given a start node and an end node, return the total number of paths
   *  of the given size.
   *  @param { String } startNode
   *  @param { String } endNode
   *  @param { Number } edgeQuantity
   *  @return { Number } 
   *  
   */
  totalPathsExactLength(startNode, endNode, edgeQuantity) {
    var paths = [];
    var adjacencyList = this.adjacencyList;
    
    exploreNode(startNode);
   
    function exploreNode(activeNode, stops) {
      stops = stops || activeNode;
      let adjacentNodes = adjacencyList.get(activeNode);
      for (let adjacentNode of adjacentNodes) {
        let currentPath = stops + adjacentNode[0];
        if (stops.length <= edgeQuantity + 1) {
          if (adjacentNode[0].endsWith(endNode) &&
              currentPath.length === edgeQuantity + 1) {
            paths.push(currentPath);
          }
          exploreNode(adjacentNode[0], currentPath);
        }
      }
    }

    return paths.length;
  }

  /**
   *  Given a start node and an end node, return the total number of paths
   *  less than accumulative edge weights.
   *  @param { String } startNode
   *  @param { String } endNode
   *  @param { Number } maximumEdgeWeight
   *  @return { Number } 
   *  
   */
  totalWeightedPaths(startNode, endNode, maximumEdgeWeight = 30) {
    var paths = [];
    var adjacencyList = this.adjacencyList;

    exploreNode(startNode);
    
    function exploreNode(activeNode, stops, distance = 0) {
      stops = stops || activeNode;
      let adjacentNodes = adjacencyList.get(activeNode);
      for (let adjacentNode of adjacentNodes) {
        let currentPath = stops + adjacentNode[0];
        let currentDistance = distance + adjacentNode[1];
        if (currentDistance < maximumEdgeWeight) {
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
