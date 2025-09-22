# 최소 신장 트리 (Minimum Spanning Tree, MST)

## 📋 개요
가중치가 있는 무방향 그래프에서 모든 정점을 연결하면서 가중치의 합이 최소인 트리를 찾는 문제입니다.

## 🔧 주요 알고리즘
1. **크루스칼 알고리즘**: 간선을 가중치 순으로 정렬하여 선택
2. **프림 알고리즘**: 정점을 하나씩 추가하며 최소 간선 선택

## 📝 크루스칼 알고리즘 구현
```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // 경로 압축
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    
    if (rootX === rootY) return false;
    
    // 랭크 기반 합치기
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    
    return true;
  }
}

function kruskalMST(vertices, edges) {
  // 간선을 가중치 순으로 정렬
  edges.sort((a, b) => a.weight - b.weight);
  
  const mst = [];
  const uf = new UnionFind(vertices);
  
  for (const edge of edges) {
    const { from, to, weight } = edge;
    
    // 사이클이 형성되지 않으면 MST에 추가
    if (uf.union(from, to)) {
      mst.push(edge);
      
      // 모든 정점이 연결되었으면 종료
      if (mst.length === vertices - 1) break;
    }
  }
  
  return mst;
}
```

## 📝 프림 알고리즘 구현
```javascript
function primMST(graph, startVertex = 0) {
  const n = graph.length;
  const mst = [];
  const visited = new Set();
  const minWeight = new Array(n).fill(Infinity);
  const parent = new Array(n).fill(-1);
  
  minWeight[startVertex] = 0;
  
  for (let count = 0; count < n - 1; count++) {
    // 방문하지 않은 정점 중 최소 가중치 정점 선택
    let minVertex = -1;
    for (let v = 0; v < n; v++) {
      if (!visited.has(v) && (minVertex === -1 || minWeight[v] < minWeight[minVertex])) {
        minVertex = v;
      }
    }
    
    visited.add(minVertex);
    
    // 선택된 정점과 연결된 간선들을 확인
    for (let v = 0; v < n; v++) {
      if (graph[minVertex][v] && !visited.has(v) && graph[minVertex][v] < minWeight[v]) {
        parent[v] = minVertex;
        minWeight[v] = graph[minVertex][v];
      }
    }
  }
  
  // MST 구성
  for (let i = 1; i < n; i++) {
    if (parent[i] !== -1) {
      mst.push({
        from: parent[i],
        to: i,
        weight: minWeight[i]
      });
    }
  }
  
  return mst;
}
```

## 📊 동작 과정 예시 (크루스칼)
```
그래프:
    A---4---B
    |       |
    2       3
    |       |
    C---1---D

간선 정렬: CD(1), AC(2), BD(3), AB(4)

1단계: CD 선택 (가중치 1)
2단계: AC 선택 (가중치 2)
3단계: BD 선택 (가중치 3)
4단계: AB는 사이클 형성하므로 제외

MST: AC(2) + CD(1) + BD(3) = 6
```

## ⏱️ 시간 복잡도
- **크루스칼**: O(E log E) - 간선 정렬이 지배적
- **프림**: O(E log V) - 우선순위 큐 사용 시
- **공간**: O(V)

## 🎯 특징
- **최적해**: 항상 최적해를 보장
- **그리디**: 매번 최소 가중치 간선 선택
- **사이클 방지**: Union-Find 또는 방문 배열로 사이클 방지

## 🎯 활용 예시
- 네트워크 설계
- 도로 건설 계획
- 전력선 배치
- 통신 네트워크 구축

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.3] 섬 연결하기
- [프로그래머스 Lv.3] 단속카메라