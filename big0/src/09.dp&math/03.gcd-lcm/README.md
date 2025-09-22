# 최대공약수와 최소공배수 (GCD & LCM)

## 📋 개요
- **최대공약수 (GCD)**: 두 수의 공통 약수 중 가장 큰 수
- **최소공배수 (LCM)**: 두 수의 공통 배수 중 가장 작은 수

## 🔧 관계식
```
GCD(a, b) × LCM(a, b) = a × b
```

## ⏱️ 시간 복잡도
- 유클리드 호제법: O(log(min(a, b)))
- 공간: O(1)

## 📝 JavaScript 구현

### 최대공약수 (GCD)
```javascript
// 유클리드 호제법 (반복문)
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
}

// 유클리드 호제법 (재귀)
function gcdRecursive(a, b) {
  if (b === 0) return Math.abs(a);
  return gcdRecursive(b, a % b);
}

// 확장 유클리드 호제법 (ax + by = gcd(a,b)를 만족하는 x, y를 찾음)
function extendedGcd(a, b) {
  if (b === 0) {
    return { gcd: Math.abs(a), x: a > 0 ? 1 : -1, y: 0 };
  }
  
  const result = extendedGcd(b, a % b);
  const x = result.y;
  const y = result.x - Math.floor(a / b) * result.y;
  
  return { gcd: result.gcd, x, y };
}
```

### 최소공배수 (LCM)
```javascript
function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

// 여러 수의 최소공배수
function lcmMultiple(numbers) {
  return numbers.reduce((acc, num) => lcm(acc, num), 1);
}
```

### 실용적인 유틸리티 함수들
```javascript
class MathUtils {
  // 두 수가 서로소인지 확인
  static isCoprime(a, b) {
    return gcd(a, b) === 1;
  }
  
  // 분수 약분
  static simplifyFraction(numerator, denominator) {
    const divisor = gcd(numerator, denominator);
    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor
    };
  }
  
  // 비율 계산
  static calculateRatio(a, b) {
    const divisor = gcd(a, b);
    return {
      a: a / divisor,
      b: b / divisor
    };
  }
  
  // 최대공약수 배열 (여러 수의 GCD)
  static gcdMultiple(numbers) {
    return numbers.reduce((acc, num) => gcd(acc, num), numbers[0]);
  }
  
  // 분수 덧셈
  static addFractions(frac1, frac2) {
    const lcmDenom = lcm(frac1.denominator, frac2.denominator);
    const newNumerator = (frac1.numerator * (lcmDenom / frac1.denominator)) +
                        (frac2.numerator * (lcmDenom / frac2.denominator));
    
    return this.simplifyFraction(newNumerator, lcmDenom);
  }
  
  // 분수 뺄셈
  static subtractFractions(frac1, frac2) {
    const lcmDenom = lcm(frac1.denominator, frac2.denominator);
    const newNumerator = (frac1.numerator * (lcmDenom / frac1.denominator)) -
                        (frac2.numerator * (lcmDenom / frac2.denominator));
    
    return this.simplifyFraction(newNumerator, lcmDenom);
  }
}
```

### 수학 문제 해결 예시
```javascript
// 프로그래머스 "N개의 최소공배수" 문제
function solution(arr) {
  return lcmMultiple(arr);
}

// 프로그래머스 "최대공약수와 최소공배수" 문제
function solution(n, m) {
  return [gcd(n, m), lcm(n, m)];
}

// 기약분수 만들기
function makeIrreducibleFraction(numerator, denominator) {
  return MathUtils.simplifyFraction(numerator, denominator);
}

// 비율 구하기
function getRatio(a, b) {
  return MathUtils.calculateRatio(a, b);
}
```

## 📊 동작 과정 예시
```
GCD(48, 18) 계산:

48 = 18 × 2 + 12
18 = 12 × 1 + 6
12 = 6 × 2 + 0

GCD = 6

LCM(48, 18) = (48 × 18) / 6 = 144
```

## 📊 확장 유클리드 호제법 예시
```
GCD(56, 15) = 1을 만족하는 x, y 찾기:

56x + 15y = 1
x = -4, y = 15

검증: 56 × (-4) + 15 × 15 = -224 + 225 = 1
```

## 🎯 특징
- **효율성**: 유클리드 호제법으로 빠른 계산
- **확장성**: 여러 수의 GCD/LCM 계산 가능
- **수학적 기반**: 수론의 기본 개념
- **실용성**: 분수 연산, 비율 계산에 활용

## 🎯 활용 예시
- 분수 연산
- 비율 계산
- 암호학 (RSA 알고리즘)
- 컴퓨터 그래픽스
- 시간 계산 (분, 초 변환)

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.1] 최대공약수와 최소공배수
- [프로그래머스 Lv.2] N개의 최소공배수
- [프로그래머스 Lv.2] 멀리 뛰기