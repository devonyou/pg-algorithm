# 최소 힙 (Min Heap)

## 📋 개요
부모 노드의 값이 자식 노드의 값보다 작거나 같은 완전 이진 트리입니다. 루트 노드가 항상 최솟값을 가집니다.

## 🔧 힙 용어
- **루트**: 힙의 최상위 노드 (최솟값)
- **리프**: 자식이 없는 노드
- **부모**: 자식 노드를 가진 노드
- **완전 이진 트리**: 마지막 레벨을 제외하고 모든 레벨이 완전히 채워진 트리
- **힙 속성**: 부모 노드 ≤ 자식 노드 (Min Heap)

## ⏱️ 시간 복잡도
- 삽입: O(log n)
- 삭제: O(log n)
- 최솟값 조회: O(1)
- 공간: O(n)

## 📝 JavaScript 구현
```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  // 부모 노드 인덱스
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  
  // 왼쪽 자식 노드 인덱스
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  
  // 오른쪽 자식 노드 인덱스
  getRightChildIndex(index) {
    return 2 * index + 2;
  }
  
  // 노드 교환
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }
  
  // 삽입
  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  
  // 위로 힙화 (삽입 후)
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
  
  // 최솟값 제거
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    
    return min;
  }
  
  // 아래로 힙화 (삭제 후)
  heapifyDown() {
    let index = 0;
    
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      
      if (rightChildIndex < this.heap.length && 
          this.heap[rightChildIndex] < this.heap[smallerChildIndex]) {
        smallerChildIndex = rightChildIndex;
      }
      
      if (this.heap[index] <= this.heap[smallerChildIndex]) {
        break;
      }
      
      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }
  
  // 최솟값 조회 (제거하지 않음)
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }
  
  // 힙 크기
  size() {
    return this.heap.length;
  }
  
  // 힙이 비어있는지 확인
  isEmpty() {
    return this.heap.length === 0;
  }
  
  // 배열로 힙 생성
  buildHeap(array) {
    this.heap = [...array];
    
    // 마지막 부모 노드부터 시작하여 힙화
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapifyDownFromIndex(i);
    }
  }
  
  // 특정 인덱스부터 아래로 힙화
  heapifyDownFromIndex(index) {
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      
      if (rightChildIndex < this.heap.length && 
          this.heap[rightChildIndex] < this.heap[smallerChildIndex]) {
        smallerChildIndex = rightChildIndex;
      }
      
      if (this.heap[index] <= this.heap[smallerChildIndex]) {
        break;
      }
      
      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }
  
  // 힙 정렬
  heapSort() {
    const sorted = [];
    const originalHeap = [...this.heap];
    
    while (!this.isEmpty()) {
      sorted.push(this.extractMin());
    }
    
    this.heap = originalHeap;
    return sorted;
  }
}
```

## 📊 힙 구조 예시
```
       1
      / \
     2   3
    / \ / \
   4  5 6  7

배열: [1, 2, 3, 4, 5, 6, 7]
인덱스: 0  1  2  3  4  5  6
```

## 🔄 힙 연산 과정

### 삽입 과정 (값 0 삽입)
```
1. 배열 끝에 추가: [1, 2, 3, 4, 5, 6, 7, 0]
2. 부모와 비교: 0 < 7 → 교환
3. [1, 2, 3, 4, 5, 6, 0, 7]
4. 부모와 비교: 0 < 3 → 교환
5. [1, 2, 0, 4, 5, 6, 3, 7]
6. 부모와 비교: 0 < 1 → 교환
7. [0, 2, 1, 4, 5, 6, 3, 7]
```

### 삭제 과정 (최솟값 제거)
```
1. 루트와 마지막 노드 교환: [7, 2, 1, 4, 5, 6, 3, 0]
2. 마지막 노드 제거: [7, 2, 1, 4, 5, 6, 3]
3. 루트를 아래로 힙화: 7과 자식들 비교
4. 7 > 2, 7 > 1 → 1과 교환: [1, 2, 7, 4, 5, 6, 3]
5. 7과 자식들 비교: 7 > 3 → 3과 교환: [1, 2, 3, 4, 5, 6, 7]
```

## 🎯 활용 예시
- **우선순위 큐**: 최솟값을 빠르게 찾고 제거
- **힙 정렬**: O(n log n) 정렬 알고리즘
- **다익스트라 알고리즘**: 최단 경로 탐색
- **이벤트 스케줄링**: 가장 빠른 이벤트 처리
- **메모리 관리**: 가장 작은 메모리 블록 할당

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 더 맵게
- [프로그래머스 Lv.3] 디스크 컨트롤러
- [프로그래머스 Lv.3] 이중우선순위큐

## 💡 핵심 포인트
- 완전 이진 트리 구조로 배열로 구현 가능
- 부모 노드 인덱스: `(i-1)/2`
- 자식 노드 인덱스: `2i+1`, `2i+2`
- 삽입/삭제 시 힙 속성 유지가 핵심
- O(log n) 시간에 최솟값 조회/제거 가능