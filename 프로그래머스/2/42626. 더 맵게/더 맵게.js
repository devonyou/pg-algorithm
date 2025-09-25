class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return index * 2 + 1;
    }

    getRightChildIndex(index) {
        return index * 2 + 2;
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [
            this.heap[index2],
            this.heap[index1],
        ];
    }

    heapifyUp() {
        let index = this.heap.length - 1;

        while (index > 0) {
            const parentIndex = this.getParentIndex(index);

            if (this.heap[parentIndex] <= this.heap[index]) {
                break;
            }

            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }

    heapifyDown() {
        let index = 0;

        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);

            if (
                rightChildIndex < this.heap.length &&
                this.heap[rightChildIndex] < this.heap[smallerChildIndex]
            ) {
                smallerChildIndex = rightChildIndex;
            }

            if (this.heap[index] <= this.heap[smallerChildIndex]) {
                break;
            }

            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }

    peak() {
        return this.heap.length && this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();

        return min;
    }
}

function solution(scoville, K) {
    const minHeap = new MinHeap();
    scoville.forEach(num => minHeap.insert(num));

    let result = 0;
    while (minHeap.peak() < K) {
        if (minHeap.size() < 2) return -1;

        const first = minHeap.extractMin();
        const second = minHeap.extractMin();
        const mixed = first + second * 2;
        minHeap.insert(mixed);
        result++;
    }

    return result;
}
