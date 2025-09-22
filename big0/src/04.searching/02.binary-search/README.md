# 이진 탐색 (Binary Search)

## 📋 개요
정렬된 배열에서 목표값을 효율적으로 찾는 탐색 알고리즘입니다. 중간값과 비교하여 탐색 범위를 절반씩 줄여나갑니다.

## 🔧 알고리즘 과정
1. 배열의 중간 인덱스를 계산
2. 중간값과 목표값을 비교
3. 일치하면 인덱스 반환
4. 목표값이 더 크면 오른쪽 절반에서 탐색
5. 목표값이 더 작으면 왼쪽 절반에서 탐색
6. 탐색 범위가 없어질 때까지 반복

## ⏱️ 시간 복잡도
- 최선: O(1) - 중간값이 목표값인 경우
- 평균: O(log n)
- 최악: O(log n)
- 공간: O(1) - 반복문 사용 시, O(log n) - 재귀 사용 시

## 📝 JavaScript 구현
```javascript
// 반복문 버전
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // 찾지 못한 경우
}

// 재귀 버전
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1;
  }
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

// 첫 번째 인덱스 찾기 (중복값이 있는 경우)
function findFirstOccurrence(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      right = mid - 1; // 왼쪽에서 더 찾기
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}
```

## 📊 동작 과정 예시
```
배열: [11, 12, 22, 25, 64] (정렬됨)
목표값: 22

1단계: left=0, right=4, mid=2
       arr[2] = 22 = target → 찾음! 인덱스 2 반환
```

## 📊 탐색 범위 축소 과정
```
초기: [11, 12, 22, 25, 64]
범위: [0, 1, 2, 3, 4]

mid=2, arr[2]=22 < 25 (target=25)
오른쪽 탐색: [25, 64], 범위: [3, 4]

mid=3, arr[3]=25 = 25 → 찾음!
```

## 🎯 특징
- **효율성**: O(log n) 시간으로 매우 빠름
- **정렬 필요**: 배열이 정렬되어 있어야 함
- **분할 정복**: 문제를 절반씩 나누어 해결
- **제한사항**: 배열이나 랜덤 액세스 가능한 자료구조에서만 사용

## 🎯 활용 예시
- 정렬된 배열에서 값 찾기
- 이진 탐색 트리 구현
- 정렬된 데이터베이스 쿼리
- 게임에서 수 범위 추측하기

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.3] 입국심사
- [프로그래머스 Lv.3] 징검다리 건너기
- [프로그래머스 Lv.4] 징검다리