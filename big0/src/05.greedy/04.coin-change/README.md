# 동전 교환 문제 (Coin Change Problem)

## 📋 개요
주어진 동전들로 특정 금액을 만드는 최소 동전 개수를 구하는 문제입니다. 그리디 알고리즘이 항상 최적해를 보장하지는 않습니다.

## 🔧 문제 유형
1. **그리디 버전**: 특정 조건에서만 최적해 보장
2. **DP 버전**: 모든 경우에 최적해 보장

## 📝 그리디 알고리즘 구현
```javascript
function coinChangeGreedy(coins, amount) {
  // 동전을 내림차순으로 정렬 (큰 동전부터)
  coins.sort((a, b) => b - a);
  
  let count = 0;
  const result = [];
  
  for (const coin of coins) {
    const numCoins = Math.floor(amount / coin);
    if (numCoins > 0) {
      count += numCoins;
      amount -= numCoins * coin;
      result.push({ coin, count: numCoins });
    }
    
    if (amount === 0) break;
  }
  
  return amount === 0 ? { totalCoins: count, breakdown: result } : -1;
}

// 그리디가 최적해를 보장하는 경우 (한국 동전 시스템)
function koreanCoinChange(amount) {
  const coins = [500, 100, 50, 10]; // 한국 동전
  return coinChangeGreedy(coins, amount);
}
```

## 📝 DP 알고리즘 구현 (최적해 보장)
```javascript
function coinChangeDP(coins, amount) {
  // dp[i] = 금액 i를 만드는 최소 동전 개수
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 금액 0을 만드는 데 필요한 동전 개수는 0
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// 동전 조합도 함께 반환하는 버전
function coinChangeWithPath(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  const path = new Array(amount + 1).fill(null);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
        path[i] = coin;
      }
    }
  }
  
  if (dp[amount] === Infinity) return -1;
  
  // 경로 복원
  const breakdown = [];
  let current = amount;
  while (current > 0) {
    const coin = path[current];
    breakdown.push(coin);
    current -= coin;
  }
  
  return {
    minCoins: dp[amount],
    breakdown: breakdown.sort((a, b) => b - a)
  };
}
```

## 📊 동작 과정 예시 (그리디)
```
동전: [1, 5, 10, 25], 금액: 67

정렬: [25, 10, 5, 1]

1단계: 67 ÷ 25 = 2 (나머지 17), 사용: 25×2 = 50
2단계: 17 ÷ 10 = 1 (나머지 7), 사용: 10×1 = 10  
3단계: 7 ÷ 5 = 1 (나머지 2), 사용: 5×1 = 5
4단계: 2 ÷ 1 = 2 (나머지 0), 사용: 1×2 = 2

결과: 25×2 + 10×1 + 5×1 + 1×2 = 67 (총 6개)
```

## 📊 그리디가 실패하는 예시
```
동전: [1, 3, 4], 금액: 6

그리디 방법: 4×1 + 1×2 = 6 (3개 동전)
최적해: 3×2 = 6 (2개 동전)
```

## ⏱️ 시간 복잡도
- **그리디**: O(n log n) - 정렬 포함
- **DP**: O(amount × coins.length)
- **공간**: O(amount)

## 🎯 그리디 최적해 보장 조건
- **표준 동전 시스템**: 각 동전이 다음 동전의 배수인 경우
- **한국 동전**: 500, 100, 50, 10 (각각 다음의 배수)
- **미국 동전**: 25, 10, 5, 1 (각각 다음의 배수)

## 🎯 활용 예시
- 자판기 거스름돈 계산
- 금융 시스템의 최소 지폐/동전 계산
- 리소스 할당 최적화
- 배낭 문제의 특수 케이스

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 큰 수 만들기
- [프로그래머스 Lv.2] 조이스틱
- [프로그래머스 Lv.3] 단속카메라