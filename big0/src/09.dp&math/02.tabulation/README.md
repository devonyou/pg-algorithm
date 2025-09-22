# 타뷸레이션 (Tabulation)

## 📋 개요
동적 계획법의 하향식 접근 방식으로, 작은 문제부터 차례대로 해결하여 큰 문제를 해결하는 방법입니다.

## 🔧 동작 원리
1. 작은 문제들의 해를 테이블에 저장
2. 점화식을 이용하여 큰 문제 해결
3. 일반적으로 반복문 사용
4. 메모이제이션보다 공간 효율적일 수 있음

## ⏱️ 시간 복잡도
- 일반적으로 O(n) 또는 O(n²)
- 공간: O(n) - 테이블 저장 공간

## 📝 JavaScript 구현

### 피보나치 수열 타뷸레이션
```javascript
function fibonacciTabulation(n) {
  if (n <= 2) return 1;
  
  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 1;
  
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// 공간 최적화 버전
function fibonacciOptimized(n) {
  if (n <= 2) return 1;
  
  let prev2 = 1; // dp[i-2]
  let prev1 = 1; // dp[i-1]
  
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}
```

### 계단 오르기 문제
```javascript
function climbStairsTabulation(n) {
  if (n <= 2) return n;
  
  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// 공간 최적화 버전
function climbStairsOptimized(n) {
  if (n <= 2) return n;
  
  let prev2 = 1; // dp[i-2]
  let prev1 = 2; // dp[i-1]
  
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}
```

### 최장 증가 부분 수열 (LIS)
```javascript
function longestIncreasingSubsequenceTabulation(nums) {
  const n = nums.length;
  const dp = new Array(n).fill(1);
  
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  
  return Math.max(...dp);
}
```

### 배낭 문제 (0/1 Knapsack)
```javascript
function knapsackTabulation(weights, values, capacity) {
  const n = weights.length;
  const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
  
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      // 현재 아이템을 포함하지 않는 경우
      dp[i][w] = dp[i - 1][w];
      
      // 현재 아이템을 포함하는 경우
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i][w],
          dp[i - 1][w - weights[i - 1]] + values[i - 1]
        );
      }
    }
  }
  
  return dp[n][capacity];
}

// 공간 최적화 버전
function knapsackOptimized(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);
  
  for (let i = 0; i < weights.length; i++) {
    for (let w = capacity; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  
  return dp[capacity];
}
```

### 편집 거리 (Edit Distance)
```javascript
function editDistanceTabulation(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  
  // 초기화
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // 삭제
          dp[i][j - 1],     // 삽입
          dp[i - 1][j - 1]  // 교체
        );
      }
    }
  }
  
  return dp[m][n];
}
```

### 정수 삼각형 문제
```javascript
function triangleTabulation(triangle) {
  const n = triangle.length;
  const dp = triangle.map(row => [...row]); // 복사
  
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[i][j] += Math.max(dp[i + 1][j], dp[i + 1][j + 1]);
    }
  }
  
  return dp[0][0];
}
```

## 📊 타뷸레이션 vs 메모이제이션
```
특성                타뷸레이션        메모이제이션
접근 방식           하향식 (Bottom-up) 상향식 (Top-down)
구현 방법           반복문             재귀
공간 복잡도         일반적으로 O(n)    일반적으로 O(n)
함수 호출 오버헤드  없음              있음
```

## 🎯 특징
- **반복문 기반**: 재귀 호출 오버헤드 없음
- **하향식**: 작은 문제부터 해결
- **공간 효율**: 필요한 부분만 계산
- **직관적**: 점화식이 명확하게 드러남

## 🎯 활용 예시
- 피보나치 수열
- 계단 오르기
- 배낭 문제
- 최장 증가 부분 수열
- 편집 거리

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 멀리 뛰기
- [프로그래머스 Lv.3] 정수 삼각형
- [프로그래머스 Lv.3] 등굣길