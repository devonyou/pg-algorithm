# 이진 탐색 트리 (Binary Search Tree, BST)

## 📋 개요
이진 트리의 특별한 형태로, 각 노드의 왼쪽 서브트리는 해당 노드보다 작은 값, 오른쪽 서브트리는 큰 값을 가지는 트리입니다.

## 🔧 BST 속성
- 왼쪽 서브트리의 모든 값 < 루트 값
- 오른쪽 서브트리의 모든 값 > 루트 값
- 각 서브트리도 BST 속성을 만족

## ⏱️ 시간 복잡도
- 삽입: O(log n) - 균형 트리, O(n) - 편향 트리
- 삭제: O(log n) - 균형 트리, O(n) - 편향 트리
- 탐색: O(log n) - 균형 트리, O(n) - 편향 트리
- 공간: O(n)

## 📝 JavaScript 구현
```javascript
class BSTNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  // 삽입
  insert(val) {
    const newNode = new BSTNode(val);
    
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    
    while (true) {
      if (val === current.val) return undefined; // 중복값 처리
      
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
  
  // 탐색
  find(val) {
    if (!this.root) return false;
    
    let current = this.root;
    
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    
    return false;
  }
  
  // 삭제
  delete(val) {
    this.root = this.deleteNode(this.root, val);
  }
  
  deleteNode(node, val) {
    if (!node) return null;
    
    if (val < node.val) {
      node.left = this.deleteNode(node.left, val);
    } else if (val > node.val) {
      node.right = this.deleteNode(node.right, val);
    } else {
      // 삭제할 노드를 찾았을 때
      
      // 자식이 없는 경우
      if (!node.left && !node.right) {
        return null;
      }
      
      // 자식이 하나인 경우
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      
      // 자식이 둘인 경우: 오른쪽 서브트리의 최솟값으로 대체
      const minNode = this.findMin(node.right);
      node.val = minNode.val;
      node.right = this.deleteNode(node.right, minNode.val);
    }
    
    return node;
  }
  
  // 최솟값 찾기
  findMin(node = this.root) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  
  // 최댓값 찾기
  findMax(node = this.root) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }
  
  // 중위 순회 (정렬된 순서로 출력)
  inorder(node = this.root, result = []) {
    if (node) {
      this.inorder(node.left, result);
      result.push(node.val);
      this.inorder(node.right, result);
    }
    return result;
  }
  
  // 유효한 BST인지 확인
  isValidBST(node = this.root, min = -Infinity, max = Infinity) {
    if (!node) return true;
    
    if (node.val <= min || node.val >= max) return false;
    
    return this.isValidBST(node.left, min, node.val) &&
           this.isValidBST(node.right, node.val, max);
  }
  
  // BST를 배열로 변환
  toArray() {
    return this.inorder();
  }
  
  // 배열에서 BST 생성
  static fromArray(arr) {
    const bst = new BinarySearchTree();
    for (const val of arr) {
      bst.insert(val);
    }
    return bst;
  }
}
```

## 📊 BST 동작 예시
```
삽입 순서: [5, 3, 7, 2, 4, 6, 8]

결과 트리:
      5
     / \
    3   7
   / \ / \
  2  4 6  8

중위 순회: [2, 3, 4, 5, 6, 7, 8] (정렬됨)
```

## 📊 삭제 케이스들
```
케이스 1: 리프 노드 삭제
    5         5
   / \   →   /
  3   7     3

케이스 2: 자식이 하나인 노드 삭제
    5         5
   / \   →   /
  3   7     7

케이스 3: 자식이 둘인 노드 삭제 (5 삭제)
    5         6
   / \   →   / \
  3   7     3   7
     /
    6
```

## 🎯 특징
- **정렬**: 중위 순회 시 정렬된 순서
- **빠른 탐색**: 평균 O(log n) 시간
- **동적**: 삽입/삭제가 쉬움
- **편향 위험**: 삽입 순서에 따라 O(n) 성능 가능

## 🎯 활용 예시
- 데이터베이스 인덱싱
- 심볼 테이블
- 우선순위 큐
- 정렬 알고리즘

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 타겟 넘버
- [프로그래머스 Lv.3] 단어 변환