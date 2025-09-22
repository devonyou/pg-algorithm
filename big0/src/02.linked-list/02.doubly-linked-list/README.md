# 이중 연결 리스트 (Doubly Linked List)

## 📋 개요
각 노드가 이전 노드와 다음 노드를 가리키는 포인터를 모두 가지는 연결 리스트입니다.

## 🔧 주요 연산
- `insert()`: 특정 위치에 노드 삽입
- `delete()`: 특정 위치의 노드 삭제
- `search()`: 특정 값 검색
- `traverse()`: 앞뒤로 리스트 순회
- `size()`: 리스트 크기 반환

## ⏱️ 시간 복잡도
- 삽입: O(1) - 맨 앞/뒤, O(n) - 특정 위치
- 삭제: O(1) - 맨 앞/뒤, O(n) - 특정 위치
- 탐색: O(n)

## 🎯 활용 예시
- LRU 캐시 구현
- 브라우저 앞으로/뒤로가기
- 음악 플레이어 이전/다음 곡
- 텍스트 에디터의 실행 취소/다시 실행
- 게임의 상태 관리

## 📝 JavaScript 구현 방법
```javascript
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  
  // 노드 클래스
  static Node = class {
    constructor(data) {
      this.data = data;
      this.prev = null;
      this.next = null;
    }
  }
  
  // 맨 앞에 삽입
  insertFirst(data) {
    const newNode = new DoublyLinkedList.Node(data);
    
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    
    this.size++;
  }
  
  // 맨 뒤에 삽입
  insertLast(data) {
    const newNode = new DoublyLinkedList.Node(data);
    
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
  }
  
  // 특정 위치에 삽입
  insertAt(data, index) {
    if (index < 0 || index > this.size) return false;
    
    if (index === 0) {
      this.insertFirst(data);
      return true;
    }
    
    if (index === this.size) {
      this.insertLast(data);
      return true;
    }
    
    const newNode = new DoublyLinkedList.Node(data);
    let current = this.head;
    
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    
    newNode.prev = current.prev;
    newNode.next = current;
    current.prev.next = newNode;
    current.prev = newNode;
    
    this.size++;
    return true;
  }
  
  // 맨 앞 요소 삭제
  removeFirst() {
    if (this.isEmpty()) return null;
    
    const removedData = this.head.data;
    
    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    
    this.size--;
    return removedData;
  }
  
  // 맨 뒤 요소 삭제
  removeLast() {
    if (this.isEmpty()) return null;
    
    const removedData = this.tail.data;
    
    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    
    this.size--;
    return removedData;
  }
  
  // 특정 위치 요소 삭제
  removeAt(index) {
    if (index < 0 || index >= this.size) return null;
    
    if (index === 0) return this.removeFirst();
    if (index === this.size - 1) return this.removeLast();
    
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    
    const removedData = current.data;
    current.prev.next = current.next;
    current.next.prev = current.prev;
    
    this.size--;
    return removedData;
  }
  
  // 특정 값 검색
  search(data) {
    let current = this.head;
    let index = 0;
    
    while (current) {
      if (current.data === data) return index;
      current = current.next;
      index++;
    }
    
    return -1;
  }
  
  // 리스트 비어있는지 확인
  isEmpty() {
    return this.size === 0;
  }
  
  // 리스트 크기 반환
  getSize() {
    return this.size;
  }
  
  // 앞에서부터 출력
  displayForward() {
    let current = this.head;
    let result = [];
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    return result.join(' <-> ');
  }
  
  // 뒤에서부터 출력
  displayBackward() {
    let current = this.tail;
    let result = [];
    
    while (current) {
      result.push(current.data);
      current = current.prev;
    }
    
    return result.join(' <-> ');
  }
}
```

## 📊 구조 다이어그램
```
null ← [Data1|Prev|Next] ↔ [Data2|Prev|Next] ↔ [Data3|Prev|Next] → null
```

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.3] 표 편집
- [프로그래머스 Lv.2] 스택/큐 문제들
- [프로그래머스 Lv.3] 캐시 문제들