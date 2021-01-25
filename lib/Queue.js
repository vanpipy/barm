/**
 * The Queue
 *
 * https://www.wikiwand.com/en/Queue_(abstract_data_type)
 */

class Queue {
    collection = [];

    enqueue(element) {
        this.collection.push(element);
    }

    dequeue() {
        this.collection.shift();
    }
}

export default Queue;
