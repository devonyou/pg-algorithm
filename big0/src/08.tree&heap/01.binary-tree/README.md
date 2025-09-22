# 이진 트리 (Binary Tree)

## 📋 개요
각 노드가 최대 2개의 자식 노드를 가지는 트리 자료구조입니다.

## 🔧 트리 용어
- **루트**: 트리의 최상위 노드
- **리프**: 자식이 없는 노드
- **높이**: 루트에서 가장 깊은 노드까지의 거리
- **깊이**: 루트에서 특정 노드까지의 거리
- **레벨**: 같은 깊이의 노드들

## ⏱️ 시간 복잡도
- 삽입: O(log n) - 균형 트리
- 삭제: O(log n) - 균형 트리
- 탐색: O(log n) - 균형 트리
- 공간: O(n)

## 📝 JavaScript 구현
```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  
  // 삽입
  insert(val) {
    const newNode = new TreeNode(val);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    this.insertNode(this.root, newNode);
  }
  
  insertNode(node, newNode) {
    if (newNode.val < node.val) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
  
  // 탐색
  search(val) {
    return this.searchNode(this.root, val);
  }
  
  searchNode(node, val) {
    if (!node) return false;
    
    if (val === node.val) return true;
    if (val < node.val) return this.searchNode(node.left, val);
    return this.searchNode(node.right, val);
  }
  
  // 전위 순회 (Root → Left → Right)
  preorder(node = this.root, result = []) {
    if (node) {
      result.push(node.val);
      this.preorder(node.left, result);
      this.preorder(node.right, result);
    }
    return result;
  }
  
  // 중위 순회 (Left → Root → Right)
  inorder(node = this.root, result = []) {
    if (node) {
      this.inorder(node.left, result);
      result.push(node.val);
      this.inorder(node.right, result);
    }
    return result;
  }
  
  // 후위 순회 (Left → Right → Root)
  postorder(node = this.root, result = []) {
    if (node) {
      this.postorder(node.left, result);
      this.postorder(node.right, result);
      result.push(node.val);
    }
    return result;
  }
  
  // 레벨 순회 (BFS)
  levelOrder() {
    if (!this.root) return [];
    
    const result = [];
    const queue = [this.root];
    
    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    return result;
  }
  
  // 높이 계산
  height(node = this.root) {
    if (!node) return 0;
    
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    
    return Math.max(leftHeight, rightHeight) + 1;
  }
  
  // 노드 개수
  countNodes(node = this.root) {
    if (!node) return 0;
    
    return 1 + this.countNodes(node.left) + this.countNodes(node.right);
  }
}
```

## 📊 트리 순회 방법들
```
       1
      / \
     2   3
    / \
   4   5

전위: 1 → 2 → 4 → 5 → 3
중위: 4 → 2 → 5 → 1 → 3
후위: 4 → 5 → 2 → 3 → 1
레벨: 1 → 2 → 3 → 4 → 5
```

## 🎯 트리 유형들
- **완전 이진 트리**: 마지막 레벨을 제외하고 모든 레벨이 완전히 채워짐
- **포화 이진 트리**: 모든 레벨이 완전히 채워짐
- **균형 이진 트리**: 좌우 서브트리의 높이 차이가 1 이하
- **완전 이진 트리**: 왼쪽부터 채워지는 이진 트리

## 🎯 활용 예시
- 파일 시스템 구조
- 데이터베이스 인덱싱
- 컴파일러 구문 분석
- 게임 AI 의사결정 트리

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 타겟 넘버
- [프로그래머스 Lv.3] 단어 변환