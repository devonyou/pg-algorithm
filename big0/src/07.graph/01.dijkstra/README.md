# 다익스트라 알고리즘 (Dijkstra's Algorithm)

## 📋 개요
단일 출발점에서 모든 다른 정점까지의 최단 경로를 찾는 알고리즘입니다. 가중치가 있는 그래프에서 사용됩니다.

## 🔧 알고리즘 과정
1. 시작 정점의 거리를 0으로, 나머지는 무한대로 초기화
2. 방문하지 않은 정점 중 가장 가까운 정점 선택
3. 선택된 정점의 인접 정점들의 거리를 업데이트
4. 모든 정점을 방문할 때까지 반복

## ⏱️ 시간 복잡도
- 우선순위 큐 사용: O((V + E) log V)
- 배열 사용: O(V²)
- 공간: O(V)

## 📝 JavaScript 구현
```javascript
function dijkstra(graph, start) {
  const distances = {};
  const previous = {};
  const visited = new Set();
  const pq = new PriorityQueue();
  
  // 초기화
  for (const vertex in graph) {
    distances[vertex] = vertex === start ? 0 : Infinity;
    previous[vertex] = null;
  }
  
  pq.enqueue(start, 0);
  
  while (!pq.isEmpty()) {
    const current = pq.dequeue().element;
    
    if (visited.has(current)) continue;
    visited.add(current);
    
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

// 우선순위 큐 구현
class PriorityQueue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element, priority) {
    const queueElement = { element, priority };
    let added = false;
    
    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }
    
    if (!added) {
      this.items.push(queueElement);
    }
  }
  
  dequeue() {
    return this.items.shift();
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}

// 경로 복원
function getPath(previous, end) {
  const path = [];
  let current = end;
  
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return path;
}
```

## 📊 동작 과정 예시
```
그래프:
    A --4-- B
    |       |
    2       3
    |       |
    C --1-- D

시작점: A

1단계: A(0) → B(4), C(2)
2단계: C(2) → D(3)
3단계: B(4), D(3) → 최종 거리

결과: A(0), B(4), C(2), D(3)
```

## 🎯 특징
- **최적해**: 항상 최단 경로를 보장
- **그리디**: 매번 가장 가까운 정점 선택
- **제한사항**: 음의 가중치가 있으면 사용 불가
- **효율성**: 우선순위 큐 사용 시 효율적

## 🎯 활용 예시
- GPS 내비게이션
- 네트워크 라우팅
- 게임 AI 경로 찾기
- 소셜 네트워크 분석

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.3] 배달
- [프로그래머스 Lv.3] 합승 택시 요금