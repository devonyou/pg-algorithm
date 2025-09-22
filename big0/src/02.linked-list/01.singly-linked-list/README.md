# 단순 연결 리스트 (Singly Linked List)

## 📋 개요
각 노드가 데이터와 다음 노드를 가리키는 포인터를 가지는 선형 자료구조입니다.

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
- 스택 구현
- 큐 구현
- 해시 테이블의 체이닝
- 다항식 표현
- 메모리 동적 할당

## 📝 JavaScript 구현 방법
```javascript
class SinglyLinkedList {
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
  
  // 맨 앞에 삽입
  insertFirst(data) {
    const newNode = new SinglyLinkedList.Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  
  // 특정 위치에 삽입
  insertAt(data, index) {
    if (index < 0 || index > this.size) return false;
    
    if (index === 0) {
      this.insertFirst(data);
      return true;
    }
    
    const newNode = new SinglyLinkedList.Node(data);
    let current = this.head;
    
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    
    newNode.next = current.next;
    current.next = newNode;
    this.size++;
    return true;
  }
  
  // 맨 앞 요소 삭제
  removeFirst() {
    if (this.isEmpty()) return null;
    
    const removedData = this.head.data;
    this.head = this.head.next;
    this.size--;
    return removedData;
  }
  
  // 특정 위치 요소 삭제
  removeAt(index) {
    if (index < 0 || index >= this.size) return null;
    
    if (index === 0) return this.removeFirst();
    
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    
    const removedData = current.next.data;
    current.next = current.next.next;
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
  
  // 리스트 출력
  display() {
    let current = this.head;
    let result = [];
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    return result.join(' -> ');
  }
}
```

## 📊 구조 다이어그램
```
Head → [Data1|Next] → [Data2|Next] → [Data3|Next] → null
```

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 스택/큐 문제들
- [프로그래머스 Lv.2] 해시 문제들
- [프로그래머스 Lv.3] 그래프 문제들