# 병합 정렬 (Merge Sort)

## 📋 개요
분할 정복(Divide and Conquer) 알고리즘을 사용하여 배열을 재귀적으로 나누고 병합하는 정렬 알고리즘입니다.

## 🔧 알고리즘 과정
1. **분할(Divide)**: 배열을 절반으로 나눔
2. **정복(Conquer)**: 각 부분을 재귀적으로 정렬
3. **병합(Combine)**: 정렬된 두 부분을 하나로 병합

## ⏱️ 시간 복잡도
- 최선: O(n log n)
- 평균: O(n log n)
- 최악: O(n log n)
- 공간: O(n)

## 📝 JavaScript 구현
```javascript
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // 두 배열의 원소를 비교하여 병합
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // 남은 원소들 추가
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
```

## 📊 동작 과정 예시
```
초기: [64, 25, 12, 22, 11]

분할:
[64, 25, 12] [22, 11]
[64, 25] [12] [22] [11]
[64] [25] [12] [22] [11]

병합:
[25, 64] [12] [22] [11]
[12, 25, 64] [11, 22]
[11, 12, 22, 25, 64]
```

## 🎯 특징
- **안정성**: 안정 정렬 (같은 값의 상대적 위치 유지)
- **일관성**: 최악의 경우에도 O(n log n) 보장
- **병렬화**: 분할 과정이 독립적이므로 병렬 처리 가능
- **외부 정렬**: 큰 파일을 정렬할 때 유용

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 가장 큰 수
- [프로그래머스 Lv.2] H-Index
- [프로그래머스 Lv.3] 입국심사