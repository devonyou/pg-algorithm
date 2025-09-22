# 큐 (Queue)

## 📋 개요
큐는 FIFO(First In, First Out) 원리를 따르는 선형 자료구조입니다.

## 🔧 주요 연산
- `enqueue()`: 큐의 뒤쪽에 요소 추가
- `dequeue()`: 큐의 앞쪽 요소 제거 및 반환
- `front()`: 큐의 앞쪽 요소 확인 (제거하지 않음)
- `isEmpty()`: 큐가 비어있는지 확인
- `size()`: 큐의 크기 반환

## ⏱️ 시간 복잡도
- 삽입: O(1)
- 삭제: O(1)
- 탐색: O(n)

## 🎯 활용 예시
- BFS (너비 우선 탐색)
- CPU 스케줄링
- 프린터 대기열
- 네트워크 패킷 처리
- 캐시 구현

## 📝 JavaScript 구현 방법
```javascript
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }
  
  front() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}
```

## 📊 동작 과정
```
enqueue(1) → enqueue(2) → enqueue(3)
[1] → [1,2] → [1,2,3]

dequeue() → dequeue() → dequeue()
[1,2,3] → [2,3] → [3] → []
```

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 기능개발
- [프로그래머스 Lv.2] 프린터
- [프로그래머스 Lv.3] 디스크 컨트롤러
- [프로그래머스 Lv.3] 이중우선순위큐