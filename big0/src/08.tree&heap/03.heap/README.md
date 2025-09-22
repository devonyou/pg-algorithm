# 힙 (Heap)

## 📋 개요
완전 이진 트리 기반의 자료구조로, 부모 노드와 자식 노드 간에 특정한 관계를 만족합니다.

## 🔧 힙의 종류
- **최대 힙**: 부모 노드 ≥ 자식 노드
- **최소 힙**: 부모 노드 ≤ 자식 노드

## 🔧 힙의 속성
- 완전 이진 트리
- 부모-자식 관계 유지
- 배열로 효율적으로 구현 가능

## ⏱️ 시간 복잡도
- 삽입: O(log n)
- 삭제: O(log n)
- 최댓값/최솟값 조회: O(1)
- 공간: O(n)

## 📝 JavaScript 구현
```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  // 부모 인덱스
  parent(index) {
    return Math.floor((index - 1) / 2);
  }
  
  // 왼쪽 자식 인덱스
  leftChild(index) {
    return 2 * index + 1;
  }
  
  // 오른쪽 자식 인덱스
  rightChild(index) {
    return 2 * index + 2;
  }
  
  // 두 요소 교환
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }
  
  // 삽입
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }
  
  // 위로 힙화
  heapifyUp(index) {
    while (index > 0 && this.heap[index] < this.heap[this.parent(index)]) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }
  
  // 최솟값 추출
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    
    return min;
  }
  
  // 아래로 힙화
  heapifyDown(index) {
    let smallest = index;
    const left = this.leftChild(index);
    const right = this.rightChild(index);
    
    if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }
    
    if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }
    
    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }
  
  // 최솟값 조회 (제거하지 않음)
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
  
  // 배열에서 힙 구성
  buildHeap(array) {
    this.heap = [...array];
    
    // 마지막 부모 노드부터 시작하여 아래로 힙화
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }
}

class MaxHeap {
  constructor() {
    this.heap = [];
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
  
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }
  
  heapifyUp(index) {
    while (index > 0 && this.heap[index] > this.heap[this.parent(index)]) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }
  
  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    
    return max;
  }
  
  heapifyDown(index) {
    let largest = index;
    const left = this.leftChild(index);
    const right = this.rightChild(index);
    
    if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
      largest = left;
    }
    
    if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
      largest = right;
    }
    
    if (largest !== index) {
      this.swap(index, largest);
      this.heapifyDown(largest);
    }
  }
  
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }
  
  size() {
    return this.heap.length;
  }
  
  isEmpty() {
    return this.heap.length === 0;
  }
}
```

## 📊 힙 구조 예시
```
배열: [1, 3, 6, 5, 9, 8]

힙 구조:
      1
     / \
    3   6
   / \ /
  5  9 8

배열 인덱스:
      0
     / \
    1   2
   / \ /
  3  4 5
```

## 📊 힙 정렬 구현
```javascript
function heapSort(array) {
  const heap = new MinHeap();
  
  // 배열을 힙에 삽입
  for (const value of array) {
    heap.insert(value);
  }
  
  // 힙에서 하나씩 추출하여 정렬된 배열 생성
  const sorted = [];
  while (!heap.isEmpty()) {
    sorted.push(heap.extractMin());
  }
  
  return sorted;
}
```

## 🎯 특징
- **완전 이진 트리**: 배열로 효율적 구현
- **우선순위**: 최댓값/최솟값을 O(1)에 조회
- **동적**: 삽입/삭제가 O(log n)
- **정렬**: 힙 정렬 알고리즘에 사용

## 🎯 활용 예시
- 우선순위 큐
- 힙 정렬
- 다익스트라 알고리즘
- 중앙값 찾기

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 더 맵게
- [프로그래머스 Lv.3] 디스크 컨트롤러
- [프로그래머스 Lv.3] 이중우선순위큐