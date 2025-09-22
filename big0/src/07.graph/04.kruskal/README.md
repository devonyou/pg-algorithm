# 크루스칼 알고리즘 (Kruskal's Algorithm)

## 📋 개요
최소 신장 트리(MST)를 찾는 그리디 알고리즘입니다. 간선을 가중치 순으로 정렬하여 사이클을 형성하지 않는 간선들을 선택합니다.

## 🔧 알고리즘 과정
1. 모든 간선을 가중치 순으로 정렬
2. 가장 가중치가 작은 간선부터 선택
3. 선택한 간선이 사이클을 형성하지 않으면 MST에 추가
4. V-1개의 간선이 선택될 때까지 반복

## ⏱️ 시간 복잡도
- 시간: O(E log E) - 간선 정렬이 지배적
- 공간: O(V) - Union-Find 자료구조

## 📝 JavaScript 구현
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
    
    if (rootX === rootY) return false; // 이미 같은 집합
    
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
  const uf = new UnionFind(vertices.length);
  let totalWeight = 0;
  
  for (const edge of edges) {
    const { from, to, weight } = edge;
    
    // 사이클이 형성되지 않으면 MST에 추가
    if (uf.union(from, to)) {
      mst.push(edge);
      totalWeight += weight;
      
      // MST가 완성되었으면 종료
      if (mst.length === vertices.length - 1) break;
    }
  }
  
  return { mst, totalWeight };
}

// 사용 예시
const vertices = ['A', 'B', 'C', 'D', 'E'];
const edges = [
  { from: 0, to: 1, weight: 4 }, // A-B
  { from: 0, to: 2, weight: 2 }, // A-C
  { from: 1, to: 2, weight: 1 }, // B-C
  { from: 1, to: 3, weight: 5 }, // B-D
  { from: 2, to: 3, weight: 8 }, // C-D
  { from: 2, to: 4, weight: 10 }, // C-E
  { from: 3, to: 4, weight: 2 }, // D-E
];

const result = kruskalMST(vertices, edges);
console.log('MST:', result.mst);
console.log('총 가중치:', result.totalWeight);
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

간선 정렬: BC(1), AC(2), DE(2), AB(4), BD(5), CD(8), CE(10)

1단계: BC 선택 (가중치 1)
2단계: AC 선택 (가중치 2)
3단계: DE 선택 (가중치 2)
4단계: AB 선택 (가중치 4)
5단계: BD는 사이클 형성하므로 제외
6단계: CD는 사이클 형성하므로 제외
7단계: CE는 사이클 형성하므로 제외

MST: BC(1) + AC(2) + DE(2) + AB(4) = 9
```

## 🎯 특징
- **그리디**: 매번 최소 가중치 간선 선택
- **최적해**: 항상 최소 신장 트리를 찾음
- **사이클 방지**: Union-Find로 사이클 감지
- **간선 중심**: 간선을 기준으로 동작

## 🎯 Union-Find 최적화
- **경로 압축**: find 연산 시 부모를 루트로 직접 연결
- **랭크 기반 합치기**: 작은 트리를 큰 트리에 합침
- **시간 복잡도**: 거의 O(1)에 가까운 성능

## 🎯 활용 예시
- 네트워크 설계
- 도로 건설 계획
- 전력선 배치
- 클러스터링

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.3] 섬 연결하기