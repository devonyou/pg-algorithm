# 너비 우선 탐색 (Breadth-First Search, BFS)

## 📋 개요
그래프나 트리를 탐색할 때 같은 레벨의 모든 정점을 먼저 방문한 후, 다음 레벨로 넘어가는 탐색 방법입니다.

## 🔧 알고리즘 과정
1. 시작 정점을 큐에 추가하고 방문 표시
2. 큐에서 정점을 제거하고 인접한 모든 방문하지 않은 정점들을 큐에 추가
3. 큐가 비어있을 때까지 반복

## ⏱️ 시간 복잡도
- 인접 리스트: O(V + E)
- 인접 행렬: O(V²)
- 공간: O(V) - 큐

## 📝 JavaScript 구현

### 기본 BFS
```javascript
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);
    
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}
```

### 레벨별 탐색
```javascript
function bfsLevelByLevel(graph, start) {
  const visited = new Set();
  const queue = [[start, 0]]; // [vertex, level]
  const levels = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const [vertex, level] = queue.shift();
    
    if (!levels[level]) {
      levels[level] = [];
    }
    levels[level].push(vertex);
    
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, level + 1]);
      }
    }
  }
  
  return levels;
}
```

### 최단 경로 찾기
```javascript
function bfsShortestPath(graph, start, end) {
  if (start === end) return [start];
  
  const visited = new Set();
  const queue = [[start, [start]]]; // [vertex, path]
  
  visited.add(start);
  
  while (queue.length > 0) {
    const [vertex, path] = queue.shift();
    
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        const newPath = [...path, neighbor];
        
        if (neighbor === end) {
          return newPath;
        }
        
        queue.push([neighbor, newPath]);
      }
    }
  }
  
  return null; // 경로 없음
}
```

### 최단 거리 계산
```javascript
function bfsShortestDistance(graph, start) {
  const visited = new Set();
  const queue = [[start, 0]]; // [vertex, distance]
  const distances = {};
  
  visited.add(start);
  distances[start] = 0;
  
  while (queue.length > 0) {
    const [vertex, distance] = queue.shift();
    
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        distances[neighbor] = distance + 1;
        queue.push([neighbor, distance + 1]);
      }
    }
  }
  
  return distances;
}
```

## 📊 동작 과정 예시
```
그래프:
    1
   / \
  2   3
 / \
4   5

BFS 순서: 1 → 2 → 3 → 4 → 5

레벨 0: [1]
레벨 1: [2, 3]
레벨 2: [4, 5]
```

## 📊 탐색 트리
```
    1
   / \
  2   3
 / \
4   5
```

## 🎯 특징
- **최단 경로**: 가중치가 없는 그래프에서 최단 경로 보장
- **완전성**: 유한 그래프에서 모든 정점 탐색 가능
- **최적성**: 가중치가 없는 그래프에서 최적
- **메모리**: 큐를 사용하여 O(V) 공간 필요

## 🎯 활용 예시
- 최단 경로 찾기
- 레벨 순서 탐색
- 소셜 네트워크의 6단계 분리 이론
- 미로에서 최단 경로
- 웹 크롤링

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 타겟 넘버
- [프로그래머스 Lv.2] 네트워크
- [프로그래머스 Lv.3] 단어 변환
- [프로그래머스 Lv.3] 여행경로