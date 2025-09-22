# 위상 정렬 (Topological Sort)

## 📋 개요
유방향 비순환 그래프(DAG)에서 정점들을 선형 순서로 나열하는 알고리즘입니다. 각 간선 (u,v)에 대해 u가 v보다 먼저 나오도록 합니다.

## 🔧 알고리즘 과정
1. **Kahn's Algorithm**: 진입 차수가 0인 정점들을 큐에 추가
2. 큐에서 정점을 제거하고 결과에 추가
3. 해당 정점의 인접 정점들의 진입 차수를 1 감소
4. 진입 차수가 0이 된 정점들을 큐에 추가
5. 큐가 비어있을 때까지 반복

## ⏱️ 시간 복잡도
- 시간: O(V + E)
- 공간: O(V)

## 📝 JavaScript 구현

### Kahn's Algorithm (위상 정렬)
```javascript
function topologicalSort(graph) {
  const inDegree = {};
  const result = [];
  const queue = [];
  
  // 진입 차수 계산
  for (const vertex in graph) {
    inDegree[vertex] = 0;
  }
  
  for (const vertex in graph) {
    for (const neighbor of graph[vertex]) {
      inDegree[neighbor]++;
    }
  }
  
  // 진입 차수가 0인 정점들을 큐에 추가
  for (const vertex in inDegree) {
    if (inDegree[vertex] === 0) {
      queue.push(vertex);
    }
  }
  
  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);
    
    // 인접 정점들의 진입 차수 감소
    for (const neighbor of graph[current]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  // 사이클이 있으면 결과 배열의 길이가 정점 수와 다름
  return result.length === Object.keys(graph).length ? result : null;
}
```

### DFS를 이용한 위상 정렬
```javascript
function topologicalSortDFS(graph) {
  const visited = new Set();
  const temp = new Set();
  const result = [];
  
  function visit(vertex) {
    if (temp.has(vertex)) {
      throw new Error('사이클이 존재합니다');
    }
    
    if (visited.has(vertex)) {
      return;
    }
    
    temp.add(vertex);
    
    for (const neighbor of graph[vertex] || []) {
      visit(neighbor);
    }
    
    temp.delete(vertex);
    visited.add(vertex);
    result.unshift(vertex); // 역순으로 추가
  }
  
  for (const vertex in graph) {
    if (!visited.has(vertex)) {
      visit(vertex);
    }
  }
  
  return result;
}
```

### 작업 스케줄링 예시
```javascript
function findMinTimeToComplete(tasks, dependencies) {
  const graph = {};
  const time = {};
  
  // 그래프 구성
  for (const task of tasks) {
    graph[task.id] = [];
    time[task.id] = task.duration;
  }
  
  for (const dep of dependencies) {
    graph[dep.from].push(dep.to);
  }
  
  const topologicalOrder = topologicalSort(graph);
  if (!topologicalOrder) {
    throw new Error('사이클이 존재하여 작업을 완료할 수 없습니다');
  }
  
  const minTime = {};
  for (const task of topologicalOrder) {
    minTime[task] = time[task];
    
    for (const neighbor of graph[task]) {
      minTime[neighbor] = Math.max(
        minTime[neighbor] || 0,
        minTime[task] + time[neighbor]
      );
    }
  }
  
  return Math.max(...Object.values(minTime));
}
```

## 📊 동작 과정 예시
```
DAG:
5 → 0 ← 4
↓   ↓   ↓
2 → 1 → 3

진입 차수: {0:2, 1:2, 2:1, 3:1, 4:0, 5:0}

1단계: 4, 5를 큐에 추가
2단계: 4 제거 → 0, 1의 진입차수 감소
3단계: 5 제거 → 2의 진입차수 감소
4단계: 2 제거 → 1의 진입차수 감소
5단계: 1 제거 → 3의 진입차수 감소
6단계: 0 제거
7단계: 3 제거

결과: [4, 5, 2, 1, 0, 3]
```

## 🎯 특징
- **DAG만 가능**: 유방향 비순환 그래프에서만 적용
- **여러 해**: 위상 정렬 결과는 유일하지 않음
- **사이클 감지**: 사이클 존재 여부 확인 가능
- **의존성 해결**: 작업 스케줄링에 유용

## 🎯 활용 예시
- 작업 스케줄링
- 컴파일러의 의존성 해결
- 코스 수강 순서 결정
- 프로젝트 관리

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.3] 단속카메라