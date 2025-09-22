# 퀵 정렬 (Quick Sort)

## 📋 개요
분할 정복 알고리즘을 사용하여 피벗(pivot)을 기준으로 배열을 분할하고 정렬하는 알고리즘입니다.

## 🔧 알고리즘 과정
1. **피벗 선택**: 배열에서 피벗 원소 선택
2. **분할(Partition)**: 피벗보다 작은 원소는 왼쪽, 큰 원소는 오른쪽으로 이동
3. **재귀**: 왼쪽과 오른쪽 부분 배열에 대해 재귀적으로 정렬

## ⏱️ 시간 복잡도
- 최선: O(n log n) - 피벗이 항상 중간값인 경우
- 평균: O(n log n)
- 최악: O(n²) - 피벗이 항상 최솟값 또는 최댓값인 경우
- 공간: O(log n) - 재귀 호출 스택

## 📝 JavaScript 구현
```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // 분할하고 피벗의 최종 위치를 얻음
    const pivotIndex = partition(arr, low, high);
    
    // 피벗을 기준으로 왼쪽과 오른쪽 부분을 재귀적으로 정렬
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}

function partition(arr, low, high) {
  // 마지막 원소를 피벗으로 선택
  const pivot = arr[high];
  let i = low - 1; // 작은 원소들의 인덱스
  
  for (let j = low; j < high; j++) {
    // 현재 원소가 피벗보다 작거나 같으면
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // 피벗을 올바른 위치에 배치
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
```

## 📊 동작 과정 예시
```
초기: [64, 25, 12, 22, 11]
피벗: 11

분할: [11] [25, 12, 22, 64]
왼쪽: [] (비어있음)
오른쪽: [25, 12, 22, 64] → 재귀 호출

피벗: 64
분할: [25, 12, 22] [64]
왼쪽: [25, 12, 22] → 재귀 호출
오른쪽: [64] (정렬 완료)

최종: [11, 12, 22, 25, 64]
```

## 🎯 특징
- **불안정성**: 불안정 정렬 (같은 값의 상대적 위치가 바뀔 수 있음)
- **제자리 정렬**: 추가 메모리 공간이 거의 필요 없음
- **빠른 성능**: 평균적으로 가장 빠른 정렬 알고리즘
- **피벗 선택**: 피벗 선택 방법이 성능에 큰 영향

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.1] K번째수
- [프로그래머스 Lv.2] 가장 큰 수
- [프로그래머스 Lv.2] H-Index