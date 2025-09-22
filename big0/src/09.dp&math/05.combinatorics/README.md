# 조합론 (Combinatorics)

## 📋 개요
유한한 개체들의 배열, 조합, 선택 등을 연구하는 수학의 분야입니다.

## 🔧 주요 개념
- **순열 (Permutation)**: 순서를 고려한 배열
- **조합 (Combination)**: 순서를 고려하지 않은 선택
- **팩토리얼**: n! = n × (n-1) × ... × 1

## ⏱️ 시간 복잡도
- 팩토리얼: O(n)
- 순열: O(n!)
- 조합: O(n! / (k!(n-k)!))
- 공간: O(1) - 단순 계산, O(n) - 배열 생성

## 📝 JavaScript 구현

### 기본 수학 함수들
```javascript
// 팩토리얼
function factorial(n) {
  if (n < 0) return null;
  if (n <= 1) return 1;
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// 팩토리얼 (재귀)
function factorialRecursive(n) {
  if (n < 0) return null;
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}

// 조합 (Combination)
function combination(n, r) {
  if (r > n || r < 0) return 0;
  if (r === 0 || r === n) return 1;
  
  // nCr = n! / (r!(n-r)!)
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// 조합 (최적화된 버전)
function combinationOptimized(n, r) {
  if (r > n || r < 0) return 0;
  if (r === 0 || r === n) return 1;
  
  r = Math.min(r, n - r); // nCr = nC(n-r)
  
  let result = 1;
  for (let i = 0; i < r; i++) {
    result = result * (n - i) / (i + 1);
  }
  
  return Math.round(result);
}

// 순열 (Permutation)
function permutation(n, r) {
  if (r > n || r < 0) return 0;
  
  let result = 1;
  for (let i = 0; i < r; i++) {
    result *= (n - i);
  }
  return result;
}
```

### 모든 조합 생성
```javascript
// 배열에서 r개를 선택하는 모든 조합
function getCombinations(arr, r) {
  const combinations = [];
  
  function backtrack(start, current) {
    if (current.length === r) {
      combinations.push([...current]);
      return;
    }
    
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return combinations;
}

// 모든 가능한 조합 (길이별)
function getAllCombinations(arr) {
  const allCombinations = [];
  
  for (let r = 1; r <= arr.length; r++) {
    allCombinations.push(...getCombinations(arr, r));
  }
  
  return allCombinations;
}
```

### 모든 순열 생성
```javascript
// 배열의 모든 순열
function getPermutations(arr) {
  if (arr.length === 0) return [[]];
  if (arr.length === 1) return [arr];
  
  const permutations = [];
  
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
    const remainingPermutations = getPermutations(remaining);
    
    for (const perm of remainingPermutations) {
      permutations.push([current, ...perm]);
    }
  }
  
  return permutations;
}

// 중복이 있는 배열의 순열 (중복 제거)
function getUniquePermutations(arr) {
  const permutations = getPermutations(arr);
  const unique = new Set();
  
  for (const perm of permutations) {
    unique.add(JSON.stringify(perm));
  }
  
  return Array.from(unique).map(str => JSON.parse(str));
}
```

### 실용적인 조합론 함수들
```javascript
class Combinatorics {
  // 파스칼의 삼각형
  static pascalTriangle(n) {
    const triangle = [];
    
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j <= i; j++) {
        row.push(combinationOptimized(i, j));
      }
      triangle.push(row);
    }
    
    return triangle;
  }
  
  // 중복 조합 (Combination with repetition)
  static combinationWithRepetition(n, r) {
    return combinationOptimized(n + r - 1, r);
  }
  
  // 중복 순열 (Permutation with repetition)
  static permutationWithRepetition(n, r) {
    return Math.pow(n, r);
  }
  
  // 원순열 (Circular permutation)
  static circularPermutation(n) {
    return factorial(n - 1);
  }
  
  // 포함-배제 원리 (Inclusion-Exclusion Principle)
  static inclusionExclusion(sets) {
    let result = 0;
    const n = sets.length;
    
    for (let i = 1; i < (1 << n); i++) {
      let intersection = sets[0];
      let bitCount = 0;
      
      for (let j = 0; j < n; j++) {
        if (i & (1 << j)) {
          intersection = intersection.filter(x => sets[j].includes(x));
          bitCount++;
        }
      }
      
      if (bitCount % 2 === 1) {
        result += intersection.length;
      } else {
        result -= intersection.length;
      }
    }
    
    return result;
  }
}
```

### 동적 계획법을 이용한 조합 계산
```javascript
// 파스칼의 삼각형을 이용한 조합 계산 (DP)
function combinationDP(n, r) {
  const dp = Array(n + 1).fill().map(() => Array(r + 1).fill(0));
  
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= Math.min(i, r); j++) {
      if (j === 0 || j === i) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      }
    }
  }
  
  return dp[n][r];
}
```

### 실용적인 문제 해결 예시
```javascript
// 프로그래머스 "조이스틱" 문제에 활용
function calculateMinMoves(name) {
  let moves = 0;
  let minMoves = name.length - 1;
  
  for (let i = 0; i < name.length; i++) {
    // 위아래 조작
    moves += Math.min(name[i].charCodeAt(0) - 'A'.charCodeAt(0), 
                      'Z'.charCodeAt(0) - name[i].charCodeAt(0) + 1);
    
    // 좌우 조작 (연속된 A 찾기)
    let next = i + 1;
    while (next < name.length && name[next] === 'A') {
      next++;
    }
    
    minMoves = Math.min(minMoves, i + name.length - next + Math.min(i, name.length - next));
  }
  
  return moves + minMoves;
}

// 문자열의 아나그램 개수
function countAnagrams(str) {
  const charCount = {};
  
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  let numerator = factorial(str.length);
  let denominator = 1;
  
  for (const count of Object.values(charCount)) {
    denominator *= factorial(count);
  }
  
  return numerator / denominator;
}
```

## 📊 조합론 예시
```
팩토리얼: 5! = 5 × 4 × 3 × 2 × 1 = 120
조합: C(5,3) = 5! / (3!(5-3)!) = 10
순열: P(5,3) = 5 × 4 × 3 = 60
중복 조합: H(5,3) = C(5+3-1,3) = C(7,3) = 35
```

## 🎯 특징
- **수학적 기반**: 확률론, 통계학의 기초
- **알고리즘**: 백트래킹, DP와 연관
- **실용성**: 확률 계산, 최적화 문제에 활용
- **확장성**: 다양한 변형 문제 존재

## 🎯 활용 예시
- 확률 계산
- 최적화 문제
- 암호학
- 게임 이론
- 알고리즘 설계

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 조이스틱
- [프로그래머스 Lv.2] 큰 수 만들기
- [프로그래머스 Lv.3] 단속카메라