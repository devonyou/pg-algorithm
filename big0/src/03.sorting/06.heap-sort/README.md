# 힙 정렬 (Heap Sort)

## 📋 개요
힙 자료구조를 이용하여 배열을 정렬하는 알고리즘입니다. 최대 힙을 구성한 후 루트 노드를 반복적으로 제거하여 정렬합니다.

## 🔧 알고리즘 과정
1. **힙 구성**: 배열을 최대 힙으로 변환
2. **힙 정렬**: 루트 노드(최댓값)를 배열의 끝으로 이동
3. **힙 크기 감소**: 힙의 크기를 1 감소
4. **힙 재구성**: 힙 속성을 다시 만족하도록 조정
5. **반복**: 힙이 비어질 때까지 반복

## ⏱️ 시간 복잡도
- 최선: O(n log n)
- 평균: O(n log n)
- 최악: O(n log n)
- 공간: O(1)

## 📝 JavaScript 구현
```javascript
function heapSort(arr) {
  const n = arr.length;
  
  // 최대 힙 구성 (bottom-up 방식)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // 힙에서 원소를 하나씩 추출하여 정렬
  for (let i = n - 1; i > 0; i--) {
    // 루트(최댓값)를 배열의 끝으로 이동
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // 힙 크기를 줄이고 힙 속성을 다시 만족시킴
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, heapSize, rootIndex) {
  let largest = rootIndex;
  const leftChild = 2 * rootIndex + 1;
  const rightChild = 2 * rootIndex + 2;
  
  // 왼쪽 자식이 루트보다 크면
  if (leftChild < heapSize && arr[leftChild] > arr[largest]) {
    largest = leftChild;
  }
  
  // 오른쪽 자식이 현재 최댓값보다 크면
  if (rightChild < heapSize && arr[rightChild] > arr[largest]) {
    largest = rightChild;
  }
  
  // 최댓값이 루트가 아니라면
  if (largest !== rootIndex) {
    [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
    
    // 영향을 받은 서브트리를 재귀적으로 힙화
    heapify(arr, heapSize, largest);
  }
}
```

## 📊 힙 구조 다이어그램
```
       64
      /  \
     25   12
    / \   /
   22 11 8
```

## 📊 동작 과정 예시
```
초기 배열: [64, 25, 12, 22, 11]
힙 구성 후: [64, 25, 12, 22, 11]

1단계: [25, 22, 12, 11, 64] (64 제거)
2단계: [22, 11, 12, 25, 64] (25 제거)
3단계: [12, 11, 22, 25, 64] (22 제거)
4단계: [11, 12, 22, 25, 64] (12 제거)
5단계: [11, 12, 22, 25, 64] (정렬 완료)
```

## 🎯 특징
- **불안정성**: 불안정 정렬
- **제자리 정렬**: 추가 메모리 공간이 거의 필요 없음
- **일관성**: 최악의 경우에도 O(n log n) 보장
- **외부 정렬**: 큰 파일을 정렬할 때 유용

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 더 맵게
- [프로그래머스 Lv.3] 디스크 컨트롤러
- [프로그래머스 Lv.3] 이중우선순위큐