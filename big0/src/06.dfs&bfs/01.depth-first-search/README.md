# 깊이 우선 탐색 (Depth-First Search, DFS)

## 📋 개요
그래프나 트리를 탐색할 때 가능한 한 깊이 들어가서 탐색한 후, 더 이상 갈 곳이 없으면 이전 정점으로 돌아가는 탐색 방법입니다.

## 🔧 알고리즘 과정
1. 시작 정점을 방문하고 스택에 푸시
2. 스택에서 정점을 팝하고 방문하지 않은 인접 정점들을 스택에 푸시
3. 스택이 비어있을 때까지 반복

## ⏱️ 시간 복잡도
- 인접 리스트: O(V + E)
- 인접 행렬: O(V²)
- 공간: O(V) - 재귀 스택 또는 스택

## 📝 JavaScript 구현

### 재귀 버전
```javascript
function dfsRecursive(graph, start, visited = new Set(), result = []) {
  visited.add(start);
  result.push(start);
  
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited, result);
    }
  }
  
  return result;
}
```

### 반복 버전 (스택 사용)
```javascript
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];
  
  while (stack.length > 0) {
    const vertex = stack.pop();
    
    if (!visited.has(vertex)) {
      visited.add(vertex);
      result.push(vertex);
      
      // 인접 정점들을 스택에 추가 (역순으로)
      for (let i = graph[vertex].length - 1; i >= 0; i--) {
        const neighbor = graph[vertex][i];
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
  
  return result;
}
```

### 경로 찾기
```javascript
function dfsPath(graph, start, end, visited = new Set(), path = []) {
  visited.add(start);
  path.push(start);
  
  if (start === end) {
    return [...path]; // 경로 복사본 반환
  }
  
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      const result = dfsPath(graph, neighbor, end, visited, path);
      if (result) {
        return result;
      }
    }
  }
  
  path.pop();
  visited.delete(start);
  return null;
}
```

### 연결 성분 찾기
```javascript
function findConnectedComponents(graph) {
  const visited = new Set();
  const components = [];
  
  for (const vertex in graph) {
    if (!visited.has(vertex)) {
      const component = dfsRecursive(graph, vertex, visited);
      components.push(component);
    }
  }
  
  return components;
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

DFS 순서: 1 → 2 → 4 → 5 → 3
```

## 📊 탐색 트리
```
    1
   /
  2
 /
4
 \
  5
   \
    3
```

## 🎯 특징
- **메모리 효율**: O(V) 공간만 사용
- **완전성**: 유한 그래프에서 모든 정점 탐색 가능
- **최적성**: 일반적으로 최단 경로를 보장하지 않음
- **구현**: 재귀 또는 스택으로 구현

## 🎯 활용 예시
- 미로 탐색
- 위상 정렬
- 사이클 감지
- 연결 성분 찾기
- 백트래킹 알고리즘

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 타겟 넘버
- [프로그래머스 Lv.2] 네트워크
- [프로그래머스 Lv.3] 단어 변환
- [프로그래머스 Lv.3] 여행경로