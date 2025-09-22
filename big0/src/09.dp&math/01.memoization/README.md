# 메모이제이션 (Memoization)

## 📋 개요
함수의 결과를 캐시에 저장하여 동일한 입력에 대해 재계산을 피하는 최적화 기법입니다.

## 🔧 동작 원리
1. 함수 호출 시 입력값을 키로 사용
2. 캐시에서 결과 확인
3. 캐시에 없으면 계산 후 저장
4. 캐시에 있으면 저장된 값 반환

## ⏱️ 시간 복잡도
- 일반적으로 지수 시간 → 선형 시간으로 개선
- 공간: O(n) - 캐시 저장 공간

## 📝 JavaScript 구현

### 피보나치 수열 메모이제이션
```javascript
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

// 클로저를 이용한 메모이제이션
function createMemoizedFunction(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log('캐시에서 반환:', key);
      return cache[key];
    }
    
    console.log('계산 후 캐시에 저장:', key);
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// 사용 예시
const memoizedFibonacci = createMemoizedFunction((n) => {
  if (n <= 2) return 1;
  return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});
```

### 동적 계획법 문제들

#### 계단 오르기 문제
```javascript
function climbStairs(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return n;
  
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
}

// 사용 예시
console.log(climbStairs(5)); // 8
```

#### 최장 증가 부분 수열 (LIS)
```javascript
function longestIncreasingSubsequence(nums, index = 0, prevIndex = -1, memo = {}) {
  const key = `${index}-${prevIndex}`;
  if (key in memo) return memo[key];
  
  if (index === nums.length) return 0;
  
  // 현재 원소를 포함하지 않는 경우
  let result = longestIncreasingSubsequence(nums, index + 1, prevIndex, memo);
  
  // 현재 원소를 포함하는 경우 (증가하는 순서인 경우만)
  if (prevIndex === -1 || nums[index] > nums[prevIndex]) {
    result = Math.max(result, 1 + longestIncreasingSubsequence(nums, index + 1, index, memo));
  }
  
  memo[key] = result;
  return result;
}
```

#### 배낭 문제 (0/1 Knapsack)
```javascript
function knapsack(weights, values, capacity, index = 0, memo = {}) {
  const key = `${index}-${capacity}`;
  if (key in memo) return memo[key];
  
  if (index === weights.length || capacity === 0) return 0;
  
  // 현재 아이템을 포함하지 않는 경우
  let result = knapsack(weights, values, capacity, index + 1, memo);
  
  // 현재 아이템을 포함하는 경우 (용량이 충분한 경우만)
  if (weights[index] <= capacity) {
    result = Math.max(
      result,
      values[index] + knapsack(weights, values, capacity - weights[index], index + 1, memo)
    );
  }
  
  memo[key] = result;
  return result;
}
```

### 범용 메모이제이션 데코레이터
```javascript
function memoize(fn, keyGenerator = (...args) => JSON.stringify(args)) {
  const cache = new Map();
  
  return function(...args) {
    const key = keyGenerator(...args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 사용 예시
const expensiveFunction = memoize((n) => {
  console.log(`계산 중: ${n}`);
  return n * n * n;
});

console.log(expensiveFunction(5)); // 계산 중: 5, 결과: 125
console.log(expensiveFunction(5)); // 결과: 125 (캐시에서)
```

## 📊 메모이제이션 효과 예시
```
피보나치 수열 (n=10)

메모이제이션 없음: O(2^n) ≈ 1024번 계산
메모이제이션 있음: O(n) ≈ 10번 계산
```

## 🎯 특징
- **시간 최적화**: 지수 시간을 선형 시간으로 개선
- **공간 트레이드오프**: 메모리 사용량 증가
- **재귀 최적화**: 재귀 함수의 성능 향상
- **동적 계획법**: DP의 핵심 기법

## 🎯 활용 예시
- 피보나치 수열
- 계단 오르기
- 배낭 문제
- 최장 증가 부분 수열
- 편집 거리 (Edit Distance)

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 멀리 뛰기
- [프로그래머스 Lv.3] 정수 삼각형
- [프로그래머스 Lv.3] 등굣길