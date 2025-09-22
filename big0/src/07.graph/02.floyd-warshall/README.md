# 플로이드-워셜 알고리즘 (Floyd-Warshall Algorithm)

## 📋 개요
모든 정점 쌍에 대해 최단 경로를 찾는 동적 계획법 알고리즘입니다. 음의 가중치도 처리할 수 있습니다.

## 🔧 알고리즘 과정
1. 인접 행렬로 그래프를 표현
2. 중간 정점을 하나씩 추가하며 최단 경로 업데이트
3. 모든 정점을 중간 정점으로 고려할 때까지 반복

## ⏱️ 시간 복잡도
- 시간: O(V³)
- 공간: O(V²)

## 📝 JavaScript 구현
```javascript
function floydWarshall(graph) {
  const n = graph.length;
  const dist = graph.map(row => [...row]); // 복사
  
  // 중간 정점 k를 통한 경로 확인
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  
  return dist;
}

// 경로 복원을 포함한 버전
function floydWarshallWithPath(graph) {
  const n = graph.length;
  const dist = graph.map(row => [...row]);
  const next = Array(n).fill().map(() => Array(n).fill(null));
  
  // next 배열 초기화
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[i][j] !== Infinity) {
        next[i][j] = j;
      }
    }
  }
  
  // 플로이드-워셜 알고리즘
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }
  
  return { dist, next };
}

// 경로 재구성
function reconstructPath(next, start, end) {
  if (next[start][end] === null) {
    return [];
  }
  
  const path = [start];
  let current = start;
  
  while (current !== end) {
    current = next[current][end];
    path.push(current);
  }
  
  return path;
}

// 음수 사이클 감지
function hasNegativeCycle(dist) {
  for (let i = 0; i < dist.length; i++) {
    if (dist[i][i] < 0) {
      return true;
    }
  }
  return false;
}
```

## 📊 동작 과정 예시
```
초기 그래프:
    0  1  2  3
0 [ 0  3 ∞  7 ]
1 [ 8  0  2 ∞ ]
2 [ 5 ∞  0  1 ]
3 [ 2 ∞ ∞  0 ]

k=0 (정점 0을 중간으로):
[ 0  3 ∞  7 ]
[ 8  0  2 15 ]
[ 5  8  0  1 ]
[ 2  5 ∞  0 ]

k=1 (정점 1을 중간으로):
[ 0  3  5  7 ]
[ 8  0  2 15 ]
[ 5  8  0  1 ]
[ 2  5  7  0 ]

최종 결과:
[ 0  3  5  6 ]
[ 5  0  2  3 ]
[ 3  6  0  1 ]
[ 2  5  7  0 ]
```

## 🎯 특징
- **모든 쌍**: 모든 정점 쌍의 최단 경로 계산
- **음의 가중치**: 음의 가중치 처리 가능
- **음수 사이클**: 음수 사이클 감지 가능
- **간단함**: 구현이 상대적으로 간단

## 🎯 활용 예시
- 네트워크 분석
- 게임 AI (모든 위치 간 거리)
- 교통 네트워크 분석
- 소셜 네트워크 분석

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.3] 합승 택시 요금