class Queue {
  constructor() {
    this.items = [];
  }

  // Adds new item to the end of the queue.
  enqueue(element) {
    this.items.push(element);
  }

  // Removes first item from the queue.
  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

export default Queue;
