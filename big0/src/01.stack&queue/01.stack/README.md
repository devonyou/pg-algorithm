# 스택 (Stack)

## 📋 개요
스택은 LIFO(Last In, First Out) 원리를 따르는 선형 자료구조입니다.

## 🔧 주요 연산
- `push()`: 스택의 맨 위에 요소 추가
- `pop()`: 스택의 맨 위 요소 제거 및 반환
- `peek()`: 스택의 맨 위 요소 확인 (제거하지 않음)
- `isEmpty()`: 스택이 비어있는지 확인
- `size()`: 스택의 크기 반환

## ⏱️ 시간 복잡도
- 삽입: O(1)
- 삭제: O(1)
- 탐색: O(n)

## 🎯 활용 예시
- 함수 호출 관리 (Call Stack)
- 괄호 매칭 검사
- 수식 계산 (후위 표기법)
- 브라우저 뒤로가기 기능
- 실행 취소 (Undo) 기능

## 📝 JavaScript 구현 방법
```javascript
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
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
push(1) → push(2) → push(3)
[1] → [1,2] → [1,2,3]

pop() → pop() → pop()
[1,2,3] → [1,2] → [1] → []
```

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 올바른 괄호
- [프로그래머스 Lv.2] 짝지어 제거하기
- [프로그래머스 Lv.2] 괄호 회전하기
- [프로그래머스 Lv.3] 표 편집