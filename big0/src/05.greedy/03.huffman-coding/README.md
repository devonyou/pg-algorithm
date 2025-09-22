# 허프만 코딩 (Huffman Coding)

## 📋 개요
문자열에서 각 문자의 빈도수를 기반으로 가변 길이 코드를 할당하여 전체 문자열의 압축률을 최적화하는 알고리즘입니다.

## 🔧 알고리즘 과정
1. 각 문자의 빈도수를 계산
2. 빈도수를 가중치로 하는 최소 힙 구성
3. 가장 빈도가 낮은 두 노드를 합쳐서 새로운 노드 생성
4. 힙에 새로운 노드 추가
5. 힙에 노드가 하나 남을 때까지 반복
6. 허프만 트리에서 각 문자에 대한 코드 생성

## ⏱️ 시간 복잡도
- 빈도 계산: O(n)
- 힙 구성: O(k log k) - k는 고유 문자 수
- 코드 생성: O(k)
- 전체: O(n + k log k)
- 공간: O(k)

## 📝 JavaScript 구현
```javascript
class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  insert(node) {
    this.heap.push(node);
    this.heapifyUp(this.heap.length - 1);
  }
  
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }
  
  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].freq <= this.heap[index].freq) break;
      
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }
  
  heapifyDown(index) {
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      
      if (leftChild < this.heap.length && 
          this.heap[leftChild].freq < this.heap[smallest].freq) {
        smallest = leftChild;
      }
      
      if (rightChild < this.heap.length && 
          this.heap[rightChild].freq < this.heap[smallest].freq) {
        smallest = rightChild;
      }
      
      if (smallest === index) break;
      
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
  
  size() {
    return this.heap.length;
  }
}

function buildHuffmanTree(text) {
  // 문자 빈도 계산
  const freq = {};
  for (const char of text) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  // 최소 힙 구성
  const minHeap = new MinHeap();
  for (const [char, frequency] of Object.entries(freq)) {
    minHeap.insert(new HuffmanNode(char, frequency));
  }
  
  // 허프만 트리 구성
  while (minHeap.size() > 1) {
    const left = minHeap.extractMin();
    const right = minHeap.extractMin();
    
    const merged = new HuffmanNode('$', left.freq + right.freq, left, right);
    minHeap.insert(merged);
  }
  
  return minHeap.extractMin();
}

function generateCodes(root, code = '', codes = {}) {
  if (!root.left && !root.right) {
    codes[root.char] = code || '0';
    return;
  }
  
  if (root.left) {
    generateCodes(root.left, code + '0', codes);
  }
  
  if (root.right) {
    generateCodes(root.right, code + '1', codes);
  }
  
  return codes;
}

function huffmanEncode(text) {
  const root = buildHuffmanTree(text);
  const codes = generateCodes(root);
  
  let encoded = '';
  for (const char of text) {
    encoded += codes[char];
  }
  
  return { encoded, codes, root };
}

function huffmanDecode(encoded, root) {
  let decoded = '';
  let current = root;
  
  for (const bit of encoded) {
    if (bit === '0') {
      current = current.left;
    } else {
      current = current.right;
    }
    
    if (!current.left && !current.right) {
      decoded += current.char;
      current = root;
    }
  }
  
  return decoded;
}
```

## 📊 동작 과정 예시
```
텍스트: "aabccd"

빈도 계산:
a: 2, b: 1, c: 2, d: 1

허프만 트리 구성:
1. b(1) + d(1) = bd(2)
2. a(2) + bd(2) = abd(4)  
3. c(2) + abd(4) = cabd(6)

코드 생성:
a: 10, b: 110, c: 0, d: 111

인코딩: "aabccd" → "101011000111"
```

## 🎯 특징
- **최적 압축**: 고정 길이 코드보다 효율적
- **접두사 코드**: 어떤 코드도 다른 코드의 접두사가 아님
- **손실 없는 압축**: 원본 데이터 완전 복원 가능
- **빈도 기반**: 자주 나타나는 문자에 짧은 코드 할당

## 🎯 활용 예시
- 파일 압축 (ZIP, GZIP)
- 이미지 압축 (JPEG)
- 네트워크 데이터 전송
- 데이터베이스 인덱싱

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 큰 수 만들기
- [프로그래머스 Lv.3] 단속카메라