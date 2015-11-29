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
    
    it('returns null when no node is found', () => {
      const nodeFound = graph.findNode('Z');
      expect(nodeFound).to.equal(null);
    });
  });

  describe('totalEdgeWeight', () => {
    it('totals the weights of 2 edges based on node input', () => {
      const totalEdgeWeight = graph.totalEdgeWeight('A', 'B', 'C');
      expect(totalEdgeWeight).to.equal(9);
    });

    it('gets the weight of 1 edge based on node input', () => {
      const totalEdgeWeight = graph.totalEdgeWeight('A', 'D');
      expect(totalEdgeWeight).to.equal(5);
    });

    it('totals the distance of route A-D-C', () => {
      const totalEdgeWeight = graph.totalEdgeWeight('A', 'D', 'C');
      expect(totalEdgeWeight).to.equal(13);
    });
    
    it('calculates the distance of 4 edges', () => {
      const totalEdgeWeight = graph.totalEdgeWeight('A', 'E', 'B', 'C', 'D');
      expect(totalEdgeWeight).to.equal(22);
    });

    it('returns null if the route does not exist', () => {
      const returnValue = graph.totalEdgeWeight('A', 'E', 'D');
      expect(returnValue).to.equal(null);
    });
  });

  describe('totalPaths', () => {
    it('gives the number of trips that start at the start node, end at the end node', () => {
      const numberOfTrips = graph.totalPaths('C', 'C', 3);
      expect(numberOfTrips).to.equal(2);
    });
  });

  describe('totalPathsExactLength', () => {
    it('gives the number of trips that start at the start node, end at the end node, and have x stops', () => {
      const numberOfTrips = graph.totalPathsExactLength('A', 'C', 4);
      expect(numberOfTrips).to.equal(3);
    });
  });

  describe('lowestWeightedPath', () => {
    it('calculates the lowest weighted path between two nodes', () => {
      const shortestRouteLength = graph.lowestWeightedPath('A', 'C');
      expect(shortestRouteLength).to.equal(9);
    });

    it('calculates the shortest route length from one node back to itself', () => {
      const shortestRouteLength = graph.lowestWeightedPath('B', 'B');
      expect(shortestRouteLength).to.equal(9);
    });
  });

  describe('totalWeightedPaths', () => {
    it('gives the number of different routes from C to C with a distance of less than 30', () => {
      const totalRoutes = graph.totalWeightedPaths('C', 'C', '30');
      expect(totalRoutes).to.equal(7);
    });
    
  });
});
