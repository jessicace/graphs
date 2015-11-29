import { expect } from 'chai';
import Graph from '../Graph';

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


describe('Graph', () => {

  describe('findNode', () => {
    it('finds the node based on string input', () => {
      const nodeFound = graph.findNode('A');
      expect(nodeFound).to.equal('A');
    });
    
    it('does not return a value when no node is found', () => {
      const nodeFound = graph.findNode('Z');
      expect(nodeFound).to.equal(null);
    });
  });

  describe('findAdjacentNodes', () => {
    it('returns an array of nodes that are adjacent to the input', () => {
      const adjacentNodes = graph.findAdjacentNodes('A');
      expect(adjacentNodes).to.equal([[ 'B', 5 ], [ 'D', 5 ], [ 'E', 7 ]]);
    });
  });

  describe('findEdge', () => {
    it('returns the requested node of... the requested node', () => {
      const edge = graph.findEdge('A', 'B');
      expect(edge).to.equal([ 'B', 5 ]);
    });

    it('returns NO SUCH ROUTE if the edge does not exist', () => {
      const edge = graph.findEdge('A', 'C');
      expect(edge).to.equal('NO SUCH ROUTE');
    });
  });
  
  describe('calculateEdgeWeight', () => {
    it('totals the weights of 2 edges based on node input', () => {
      const totalEdgeWeight = graph.calculateEdgeWeight(['A', 'B', 'C']);
      expect(totalEdgeWeight).to.equal(9);
    });

    it('gets the weight of 1 edge based on node input', () => {
      const totalEdgeWeight = graph.calculateEdgeWeight(['A', 'D']);
      expect(totalEdgeWeight).to.equal(5);
    });

    it('totals the distance of route A-D-C', () => {
      const totalEdgeWeight = graph.calculateEdgeWeight(['A', 'D', 'C']);
      expect(totalEdgeWeight).to.equal(13);
    });
    
    it('calculates the distance of 4 edges', () => {
      const totalEdgeWeight = graph.calculateEdgeWeight(['A', 'E', 'B', 'C', 'D']);
      expect(totalEdgeWeight).to.equal(22);
    });

    it('returns "NO SUCH ROUTE" if the route does not exist', () => {
      const returnValue = graph.calculateEdgeWeight(['A', 'E', 'D']);
      expect(returnValue).to.equal('NO SUCH ROUTE');
    });
  });

 describe('startEndMaximumStops', () => {
    it('gives the number of trips that start at the start node, end at the end node', () => {
      const numberOfTrips = graph.startEndMaximumStops('C', 'C', 3);
      expect(numberOfTrips).to.equal(2);
    });
  });

  describe('startEndExactStops', () => {
    it('gives the number of trips that start at the start node, end at the end node, and have x stops', () => {
      const numberOfTrips = graph.startEndExactStops('A', 'C', 4);
      expect(numberOfTrips).to.equal(3);
    });
  });

   describe('shortestDistanceSearch', () => {
    it('calculates the shortest length between two nodes', () => {
      const shortestRouteLength = graph.shortestDistanceSearch('A', 'C');
      expect(shortestRouteLength).to.equal(9);
    });

    it('calculates the shortest route length from one node back to itself', () => {
      const shortestRouteLength = graph.shortestDistanceSearch('B', 'B');
      expect(shortestRouteLength).to.equal(9);
    });
  });

  describe('totalWeightedPaths', () => {
    it('gives the number of different routes from C to C with a distance of less than 30', () => {
      const totalRoutes = graph.totalWeightedPaths('C', 'C', '30');
      console.log(totalRoutes);
      expect(totalRoutes).to.equal(7);
    });
    
  });
});
