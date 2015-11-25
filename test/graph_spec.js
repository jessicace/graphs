import { expect } from 'chai';
import { Graph } from '../Graph';

let graph = new Graph();
const nodes = [ 'A', 'B', 'C', 'D', 'E' ];
for (let node in nodes) {
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
  describe('addNode', () => {
    it('adds the node to the array', () => {
      
    });
  });

  describe('addEdge', () => {
    it('adds an Edge array to the Map', () => {
      
    });
  });

  describe('calculateEdgeWeight', () => {
    it('totals the weights of edges based on node input', () => {
      
    });
  });
});
