# 최대 힙 (Max Heap)

## 📋 개요
부모 노드의 값이 자식 노드의 값보다 크거나 같은 완전 이진 트리입니다. 루트 노드가 항상 최댓값을 가집니다.

## 🔧 힙 용어
- **루트**: 힙의 최상위 노드 (최댓값)
- **리프**: 자식이 없는 노드
- **부모**: 자식 노드를 가진 노드
- **완전 이진 트리**: 마지막 레벨을 제외하고 모든 레벨이 완전히 채워진 트리
- **힙 속성**: 부모 노드 ≥ 자식 노드 (Max Heap)

## ⏱️ 시간 복잡도
- 삽입: O(log n)
- 삭제: O(log n)
- 최댓값 조회: O(1)
- 공간: O(n)

## 📝 JavaScript 구현
```javascript
class MaxHeap {
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
      
      if (this.heap[parentIndex] >= this.heap[index]) {
        break;
      }
      
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }
  
  // 최댓값 제거
  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    
    return max;
  }
  
  // 아래로 힙화 (삭제 후)
  heapifyDown() {
    let index = 0;
    
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let largerChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      
      if (rightChildIndex < this.heap.length && 
          this.heap[rightChildIndex] > this.heap[largerChildIndex]) {
        largerChildIndex = rightChildIndex;
      }
      
      if (this.heap[index] >= this.heap[largerChildIndex]) {
        break;
      }
      
      this.swap(index, largerChildIndex);
      index = largerChildIndex;
    }
  }
  
  // 최댓값 조회 (제거하지 않음)
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
      let largerChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      
      if (rightChildIndex < this.heap.length && 
          this.heap[rightChildIndex] > this.heap[largerChildIndex]) {
        largerChildIndex = rightChildIndex;
      }
      
      if (this.heap[index] >= this.heap[largerChildIndex]) {
        break;
      }
      
      this.swap(index, largerChildIndex);
      index = largerChildIndex;
    }
  }
  
  // 힙 정렬 (내림차순)
  heapSort() {
    const sorted = [];
    const originalHeap = [...this.heap];
    
    while (!this.isEmpty()) {
      sorted.push(this.extractMax());
    }
    
    this.heap = originalHeap;
    return sorted;
  }
  
  // k번째 최댓값 찾기
  findKthLargest(k) {
    if (k > this.heap.length || k <= 0) return null;
    
    const tempHeap = [...this.heap];
    let result = null;
    
    for (let i = 0; i < k; i++) {
      result = this.extractMax();
    }
    
    this.heap = tempHeap;
    return result;
  }
}
```

## 📊 힙 구조 예시
```
       7
      / \
     6   5
    / \ / \
   4  3 2  1

배열: [7, 6, 5, 4, 3, 2, 1]
인덱스: 0  1  2  3  4  5  6
```

## 🔄 힙 연산 과정

### 삽입 과정 (값 8 삽입)
```
1. 배열 끝에 추가: [7, 6, 5, 4, 3, 2, 1, 8]
2. 부모와 비교: 8 > 1 → 교환
3. [7, 6, 5, 4, 3, 2, 8, 1]
4. 부모와 비교: 8 > 5 → 교환
5. [7, 6, 8, 4, 3, 2, 5, 1]
6. 부모와 비교: 8 > 7 → 교환
7. [8, 6, 7, 4, 3, 2, 5, 1]
```

### 삭제 과정 (최댓값 제거)
```
1. 루트와 마지막 노드 교환: [1, 6, 7, 4, 3, 2, 5, 8]
2. 마지막 노드 제거: [1, 6, 7, 4, 3, 2, 5]
3. 루트를 아래로 힙화: 1과 자식들 비교
4. 1 < 6, 1 < 7 → 7과 교환: [7, 6, 1, 4, 3, 2, 5]
5. 1과 자식들 비교: 1 < 5 → 5와 교환: [7, 6, 5, 4, 3, 2, 1]
```

## 🎯 활용 예시
- **우선순위 큐**: 최댓값을 빠르게 찾고 제거
- **힙 정렬**: O(n log n) 정렬 알고리즘 (내림차순)
- **Top K 문제**: 가장 큰 K개 원소 찾기
- **중앙값 찾기**: 두 개의 힙으로 중앙값 유지
- **메모리 관리**: 가장 큰 메모리 블록 할당
- **게임 AI**: 가장 높은 점수나 우선순위 처리

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 더 맵게
- [프로그래머스 Lv.3] 디스크 컨트롤러
- [프로그래머스 Lv.3] 이중우선순위큐
- [프로그래머스 Lv.2] K번째수

## 💡 Min Heap vs Max Heap 비교

| 특징 | Min Heap | Max Heap |
|------|----------|----------|
| 루트 값 | 최솟값 | 최댓값 |
| 힙 속성 | 부모 ≤ 자식 | 부모 ≥ 자식 |
| 비교 연산 | `<=`, `>=` | `>=`, `<=` |
| 자식 선택 | 더 작은 값 | 더 큰 값 |
| 활용 | 최솟값 우선 | 최댓값 우선 |

## 🔧 고급 활용 패턴

### 1. 중앙값 찾기 (두 개의 힙 사용)
```javascript
class MedianFinder {
  constructor() {
    this.maxHeap = new MaxHeap(); // 작은 값들 (왼쪽)
    this.minHeap = new MinHeap(); // 큰 값들 (오른쪽)
  }
  
  addNum(num) {
    if (this.maxHeap.isEmpty() || num <= this.maxHeap.peek()) {
      this.maxHeap.insert(num);
    } else {
      this.minHeap.insert(num);
    }
    
    // 균형 맞추기
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.insert(this.maxHeap.extractMax());
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      this.maxHeap.insert(this.minHeap.extractMin());
    }
  }
  
  findMedian() {
    if (this.maxHeap.size() === this.minHeap.size()) {
      return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    }
    return this.maxHeap.peek();
  }
}
```

### 2. K번째 최댓값 찾기
```javascript
// 방법 1: 힙 정렬 사용
function findKthLargest(nums, k) {
  const maxHeap = new MaxHeap();
  maxHeap.buildHeap(nums);
  return maxHeap.findKthLargest(k);
}

// 방법 2: Min Heap으로 Top K 유지
function findKthLargestWithMinHeap(nums, k) {
  const minHeap = new MinHeap();
  
  for (let num of nums) {
    if (minHeap.size() < k) {
      minHeap.insert(num);
    } else if (num > minHeap.peek()) {
      minHeap.extractMin();
      minHeap.insert(num);
    }
  }
  
  return minHeap.peek();
}
```

## 💡 핵심 포인트
- 완전 이진 트리 구조로 배열로 구현 가능
- 부모 노드 인덱스: `(i-1)/2`
- 자식 노드 인덱스: `2i+1`, `2i+2`
- 삽입/삭제 시 힙 속성 유지가 핵심
- O(log n) 시간에 최댓값 조회/제거 가능
- Min Heap과 Max Heap은 비교 연산만 반대