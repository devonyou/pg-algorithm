# 소수 판별 (Prime Number Check)

## 📋 개요
주어진 수가 소수인지 판별하는 알고리즘입니다. 소수는 1과 자기 자신으로만 나누어떨어지는 1보다 큰 자연수입니다.

## 🔧 판별 방법
1. **단순 방법**: 2부터 n-1까지 나누어보기
2. **최적화**: 2부터 √n까지 나누어보기
3. **에라토스테네스의 체**: 범위 내 모든 소수 찾기

## ⏱️ 시간 복잡도
- 단순 방법: O(n)
- 최적화: O(√n)
- 에라토스테네스의 체: O(n log log n)
- 공간: O(n) - 체 사용 시

## 📝 JavaScript 구현

### 기본 소수 판별
```javascript
function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  
  return true;
}

// 더 효율적인 버전
function isPrimeOptimized(n) {
  if (n < 2) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  
  return true;
}
```

### 에라토스테네스의 체
```javascript
function sieveOfEratosthenes(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  
  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }
  
  return isPrime;
}

// 소수 배열 반환
function getPrimes(n) {
  const isPrime = sieveOfEratosthenes(n);
  const primes = [];
  
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) {
      primes.push(i);
    }
  }
  
  return primes;
}
```

### 소인수분해
```javascript
function primeFactorization(n) {
  const factors = [];
  let divisor = 2;
  
  while (divisor * divisor <= n) {
    while (n % divisor === 0) {
      factors.push(divisor);
      n /= divisor;
    }
    divisor++;
  }
  
  if (n > 1) {
    factors.push(n);
  }
  
  return factors;
}

// 소인수분해 결과를 객체로 반환
function primeFactorizationObject(n) {
  const factors = {};
  let divisor = 2;
  
  while (divisor * divisor <= n) {
    while (n % divisor === 0) {
      factors[divisor] = (factors[divisor] || 0) + 1;
      n /= divisor;
    }
    divisor++;
  }
  
  if (n > 1) {
    factors[n] = 1;
  }
  
  return factors;
}
```

### 실용적인 소수 관련 함수들
```javascript
class PrimeUtils {
  // 다음 소수 찾기
  static nextPrime(n) {
    let candidate = n + 1;
    while (!isPrime(candidate)) {
      candidate++;
    }
    return candidate;
  }
  
  // 이전 소수 찾기
  static previousPrime(n) {
    if (n <= 2) return null;
    let candidate = n - 1;
    while (!isPrime(candidate)) {
      candidate--;
    }
    return candidate;
  }
  
  // 소수 쌍 (차이가 2인 소수)
  static findTwinPrimes(limit) {
    const primes = getPrimes(limit);
    const twinPrimes = [];
    
    for (let i = 0; i < primes.length - 1; i++) {
      if (primes[i + 1] - primes[i] === 2) {
        twinPrimes.push([primes[i], primes[i + 1]]);
      }
    }
    
    return twinPrimes;
  }
  
  // 골드바흐 추측 (짝수를 두 소수의 합으로 표현)
  static goldbachConjecture(n) {
    if (n < 4 || n % 2 !== 0) return null;
    
    const primes = getPrimes(n);
    const primeSet = new Set(primes);
    
    for (const prime of primes) {
      if (primeSet.has(n - prime)) {
        return [prime, n - prime];
      }
    }
    
    return null;
  }
  
  // 소수 개수 계산 (π 함수)
  static primeCount(n) {
    return getPrimes(n).length;
  }
}
```

### 범위 내 소수 찾기 (최적화된 체)
```javascript
function segmentedSieve(low, high) {
  const limit = Math.floor(Math.sqrt(high)) + 1;
  const basePrimes = getPrimes(limit);
  
  const isPrime = new Array(high - low + 1).fill(true);
  
  for (const prime of basePrimes) {
    let start = Math.max(prime * prime, Math.ceil(low / prime) * prime);
    
    for (let i = start; i <= high; i += prime) {
      isPrime[i - low] = false;
    }
  }
  
  const primes = [];
  for (let i = 0; i < isPrime.length; i++) {
    if (isPrime[i] && (i + low) >= 2) {
      primes.push(i + low);
    }
  }
  
  return primes;
}
```

## 📊 에라토스테네스의 체 동작 과정
```
n = 30일 때:

초기: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]

i=2: 4,6,8,10,12,14,16,18,20,22,24,26,28,30 제거
i=3: 9,15,21,27 제거
i=5: 25 제거

결과: [2,3,5,7,11,13,17,19,23,29]
```

## 🎯 특징
- **효율성**: √n까지만 확인하면 됨
- **확장성**: 범위 내 모든 소수 찾기 가능
- **수학적**: 수론의 기본 개념
- **실용성**: 암호학, 해시 함수에 활용

## 🎯 활용 예시
- 암호학 (RSA, 해시 함수)
- 해시 테이블 크기 선택
- 수학 문제 해결
- 알고리즘 최적화

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.1] 소수 만들기
- [프로그래머스 Lv.2] N개의 최소공배수