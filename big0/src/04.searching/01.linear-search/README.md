# 선형 탐색 (Linear Search)

## 📋 개요
배열의 첫 번째 원소부터 마지막 원소까지 순차적으로 탐색하는 알고리즘입니다.

## 🔧 알고리즘 과정
1. 배열의 첫 번째 원소부터 시작
2. 각 원소를 목표값과 비교
3. 일치하면 해당 인덱스 반환
4. 배열 끝까지 찾지 못하면 -1 반환

## ⏱️ 시간 복잡도
- 최선: O(1) - 첫 번째 원소가 목표값인 경우
- 평균: O(n)
- 최악: O(n)
- 공간: O(1)

## 📝 JavaScript 구현
```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // 인덱스 반환
    }
  }
  return -1; // 찾지 못한 경우
}

// 개선된 버전 (forEach 사용)
function linearSearchForEach(arr, target) {
  let result = -1;
  arr.forEach((element, index) => {
    if (element === target && result === -1) {
      result = index;
    }
  });
  return result;
}

// 객체 배열에서 특정 속성값으로 탐색
function linearSearchByProperty(arr, targetValue, property) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][property] === targetValue) {
      return i;
    }
  }
  return -1;
}
```

## 📊 동작 과정 예시
```
배열: [64, 25, 12, 22, 11]
목표값: 22

1단계: 64 ≠ 22 (계속)
2단계: 25 ≠ 22 (계속)
3단계: 12 ≠ 22 (계속)
4단계: 22 = 22 (찾음!) → 인덱스 3 반환
```

## 🎯 특징
- **간단함**: 구현이 매우 간단
- **정렬 불필요**: 배열이 정렬되지 않아도 사용 가능
- **모든 자료구조**: 배열, 연결리스트 등 모든 선형 자료구조에 적용 가능
- **안정성**: 같은 값이 여러 개 있어도 첫 번째 인덱스 반환

## 🎯 활용 예시
- 작은 크기의 배열 탐색
- 정렬되지 않은 배열 탐색
- 연결 리스트에서의 탐색
- 데이터베이스의 순차 스캔

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.1] 완주하지 못한 선수
- [프로그래머스 Lv.2] 전화번호 목록
- [프로그래머스 Lv.2] 위장