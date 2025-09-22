# 우선순위 큐 (Priority Queue)

## 📋 개요
각 요소가 우선순위를 가지는 큐로, 우선순위가 높은 요소가 먼저 처리됩니다.

## 🔧 구현 방법
1. **힙 기반**: 최대 힙 또는 최소 힙 사용
2. **배열 기반**: 정렬된 배열 유지
3. **연결 리스트 기반**: 정렬된 연결 리스트 유지

## ⏱️ 시간 복잡도
- 삽입: O(log n) - 힙 기반
- 삭제: O(log n) - 힙 기반
- 최우선 요소 조회: O(1) - 힙 기반
- 공간: O(n)

## 📝 JavaScript 구현

### 힙 기반 우선순위 큐
```javascript
class PriorityQueue {
  constructor(compareFunction = (a, b) => a - b) {
    this.heap = [];
    this.compare = compareFunction; // 최소 힙: (a, b) => a - b, 최대 힙: (a, b) => b - a
  }
  
  parent(index) {
    return Math.floor((index - 1) / 2);
  }
  
  leftChild(index) {
    return 2 * index + 1;
  }
  
  rightChild(index) {
    return 2 * index + 2;
  }
  
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }
  
  // 요소 삽입
  enqueue(value, priority) {
    const element = { value, priority };
    this.heap.push(element);
    this.heapifyUp(this.heap.length - 1);
  }
  
  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.parent(index);
      if (this.compare(this.heap[index].priority, this.heap[parentIndex].priority) >= 0) break;
      
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }
  
  // 최우선 요소 제거
  dequeue() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    
    return top;
  }
  
  heapifyDown(index) {
    while (true) {
      let smallest = index;
      const left = this.leftChild(index);
      const right = this.rightChild(index);
      
      if (left < this.heap.length && 
          this.compare(this.heap[left].priority, this.heap[smallest].priority) < 0) {
        smallest = left;
      }
      
      if (right < this.heap.length && 
          this.compare(this.heap[right].priority, this.heap[smallest].priority) < 0) {
        smallest = right;
      }
      
      if (smallest === index) break;
      
      this.swap(index, smallest);
      index = smallest;
    }
  }
  
  // 최우선 요소 조회 (제거하지 않음)
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }
  
  // 크기
  size() {
    return this.heap.length;
  }
  
  // 비어있는지 확인
  isEmpty() {
    return this.heap.length === 0;
  }
  
  // 모든 요소 출력
  toArray() {
    return this.heap.map(item => ({ value: item.value, priority: item.priority }));
  }
}

// 사용 예시
const pq = new PriorityQueue();

// 값과 우선순위를 함께 삽입
pq.enqueue('작업1', 3);
pq.enqueue('작업2', 1);
pq.enqueue('작업3', 2);

console.log(pq.dequeue()); // { value: '작업2', priority: 1 } (가장 높은 우선순위)
console.log(pq.dequeue()); // { value: '작업3', priority: 2 }
console.log(pq.dequeue()); // { value: '작업1', priority: 3 }
```

### 최대 우선순위 큐
```javascript
class MaxPriorityQueue extends PriorityQueue {
  constructor() {
    super((a, b) => b - a); // 최대 힙
  }
}

// 사용 예시
const maxPQ = new MaxPriorityQueue();
maxPQ.enqueue('높은 우선순위', 10);
maxPQ.enqueue('낮은 우선순위', 1);
maxPQ.enqueue('중간 우선순위', 5);

console.log(maxPQ.dequeue()); // { value: '높은 우선순위', priority: 10 }
```

### 다익스트라 알고리즘용 우선순위 큐
```javascript
function dijkstraWithPQ(graph, start) {
  const distances = {};
  const previous = {};
  const pq = new PriorityQueue();
  
  // 초기화
  for (const vertex in graph) {
    distances[vertex] = vertex === start ? 0 : Infinity;
    previous[vertex] = null;
  }
  
  pq.enqueue(start, 0);
  
  while (!pq.isEmpty()) {
    const { value: current, priority: currentDist } = pq.dequeue();
    
    if (currentDist > distances[current]) continue;
    
    for (const neighbor in graph[current]) {
      const weight = graph[current][neighbor];
      const distance = distances[current] + weight;
      
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = current;
        pq.enqueue(neighbor, distance);
      }
    }
  }
  
  return { distances, previous };
}
```

## 📊 우선순위 큐 동작 예시
```
삽입 순서: (값, 우선순위)
(A, 3), (B, 1), (C, 2), (D, 1)

힙 구조:
    B(1)
   /   \
  D(1)  C(2)
 /
A(3)

삭제 순서: B(1) → D(1) → C(2) → A(3)
```

## 🎯 특징
- **우선순위**: 높은 우선순위 요소가 먼저 처리
- **효율성**: 힙 기반으로 O(log n) 성능
- **유연성**: 다양한 우선순위 함수 지원
- **동적**: 실행 시간에 요소 추가/제거 가능

## 🎯 활용 예시
- 작업 스케줄링
- 다익스트라 알고리즘
- 허프만 코딩
- A* 경로 찾기
- 이벤트 시뮬레이션

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 더 맵게
- [프로그래머스 Lv.3] 디스크 컨트롤러
- [프로그래머스 Lv.3] 이중우선순위큐