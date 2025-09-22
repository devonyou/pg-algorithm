# 순환 연결 리스트 (Circular Linked List)

## 📋 개요
마지막 노드가 첫 번째 노드를 가리키는 연결 리스트입니다.

## 🔧 주요 연산
- `insert()`: 특정 위치에 노드 삽입
- `delete()`: 특정 위치의 노드 삭제
- `search()`: 특정 값 검색
- `traverse()`: 리스트 순회
- `size()`: 리스트 크기 반환

## ⏱️ 시간 복잡도
- 삽입: O(1) - 맨 앞, O(n) - 특정 위치
- 삭제: O(1) - 맨 앞, O(n) - 특정 위치
- 탐색: O(n)

## 🎯 활용 예시
- 라운드 로빈 스케줄링
- 원형 버퍼 구현
- 게임의 순환 구조
- 음악 플레이어의 반복 재생
- 로테이션 메뉴

## 📝 JavaScript 구현 방법
```javascript
class CircularLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // 노드 클래스
  static Node = class {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  // 삽입, 삭제, 탐색 메서드들...
}
```

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스] 스택/큐 문제들
- [프로그래머스] 해시 문제들