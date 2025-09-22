# 프림 알고리즘 (Prim's Algorithm)

## 📋 개요
최소 신장 트리(MST)를 찾는 그리디 알고리즘입니다. 정점을 하나씩 추가하면서 최소 가중치 간선을 선택합니다.

## 🔧 알고리즘 과정
1. 임의의 정점을 MST에 포함
2. MST에 포함된 정점들과 연결된 간선 중 최소 가중치 간선 선택
3. 선택한 간선의 다른 정점을 MST에 포함
4. 모든 정점이 포함될 때까지 반복

## ⏱️ 시간 복잡도
- 우선순위 큐 사용: O(E log V)
- 배열 사용: O(V²)
- 공간: O(V)

## 📝 JavaScript 구현
```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  insert(item) {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  }
  
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }
  
  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].weight <= this.heap[index].weight) break;
      
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }
  
  heapifyDown(index) {
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      
      if (leftChild < this.heap.length && 
          this.heap[leftChild].weight < this.heap[smallest].weight) {
        smallest = leftChild;
      }
      
      if (rightChild < this.heap.length && 
          this.heap[rightChild].weight < this.heap[smallest].weight) {
        smallest = rightChild;
      }
      
      if (smallest === index) break;
      
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
  
  isEmpty() {
    return this.heap.length === 0;
  }
}

function primMST(graph, startVertex = 0) {
  const n = graph.length;
  const mst = [];
  const visited = new Set();
  const minHeap = new MinHeap();
  
  // 시작 정점과 연결된 간선들을 힙에 추가
  for (let i = 0; i < n; i++) {
    if (graph[startVertex][i] > 0) {
      minHeap.insert({
        from: startVertex,
        to: i,
        weight: graph[startVertex][i]
      });
    }
  }
  
  visited.add(startVertex);
  
  while (!minHeap.isEmpty() && mst.length < n - 1) {
    const edge = minHeap.extractMin();
    
    // 이미 방문한 정점이면 건너뛰기
    if (visited.has(edge.to)) continue;
    
    mst.push(edge);
    visited.add(edge.to);
    
    // 새로 추가된 정점과 연결된 간선들을 힙에 추가
    for (let i = 0; i < n; i++) {
      if (graph[edge.to][i] > 0 && !visited.has(i)) {
        minHeap.insert({
          from: edge.to,
          to: i,
          weight: graph[edge.to][i]
        });
      }
    }
  }
  
  return mst;
}

// 인접 리스트 버전
function primMSTAdjacencyList(graph, startVertex = 0) {
  const n = Object.keys(graph).length;
  const mst = [];
  const visited = new Set();
  const minHeap = new MinHeap();
  
  // 시작 정점과 연결된 간선들을 힙에 추가
  for (const neighbor of graph[startVertex]) {
    minHeap.insert({
      from: startVertex,
      to: neighbor.vertex,
      weight: neighbor.weight
    });
  }
  
  visited.add(startVertex);
  
  while (!minHeap.isEmpty() && mst.length < n - 1) {
    const edge = minHeap.extractMin();
    
    if (visited.has(edge.to)) continue;
    
    mst.push(edge);
    visited.add(edge.to);
    
    // 새로 추가된 정점과 연결된 간선들을 힙에 추가
    for (const neighbor of graph[edge.to]) {
      if (!visited.has(neighbor.vertex)) {
        minHeap.insert({
          from: edge.to,
          to: neighbor.vertex,
          weight: neighbor.weight
        });
      }
    }
  }
  
  return mst;
}
```

## 📊 동작 과정 예시
```
그래프:
    A---4---B
    |       |
    2       5
    |       |
    C---1---D
    |       |
    10      2
    |       |
    E-------|

시작 정점: A

1단계: A(0) → 간선 AC(2), AB(4) 추가
2단계: C(2) 선택 → 간선 CD(1), CE(10) 추가
3단계: D(1) 선택 → 간선 DE(2) 추가
4단계: B(4) 선택 → 간선 BD(5) 추가 (사이클이므로 제외)
5단계: E(2) 선택

MST: AC(2) + CD(1) + AB(4) + DE(2) = 9
```

## 🎯 특징
- **그리디**: 매번 최소 가중치 간선 선택
- **최적해**: 항상 최소 신장 트리를 찾음
- **정점 중심**: 정점을 기준으로 동작
- **밀집 그래프**: 밀집 그래프에서 크루스칼보다 효율적

## 🎯 크루스칼 vs 프림
- **크루스칼**: 간선 중심, 희소 그래프에 유리
- **프림**: 정점 중심, 밀집 그래프에 유리
- **시간 복잡도**: 둘 다 O(E log V) (우선순위 큐 사용 시)

## 🎯 활용 예시
- 네트워크 설계
- 도로 건설 계획
- 전력선 배치
- 클러스터링

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.3] 섬 연결하기