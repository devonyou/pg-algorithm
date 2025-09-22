# 청크 리스트 (Chunked List)

## 📋 개요
여러 개의 고정 크기 청크로 나누어진 연결 리스트입니다.

## 🔧 주요 연산
- `insert()`: 특정 위치에 요소 삽입
- `delete()`: 특정 위치의 요소 삭제
- `search()`: 특정 값 검색
- `get()`: 인덱스로 요소 접근
- `size()`: 전체 요소 개수 반환

## ⏱️ 시간 복잡도
- 삽입: O(1) - 평균, O(n) - 최악
- 삭제: O(1) - 평균, O(n) - 최악
- 탐색: O(n)
- 접근: O(n/m) - m은 청크 크기

## 🎯 활용 예시
- 대용량 데이터 처리
- 메모리 효율적인 동적 배열
- 데이터베이스 인덱싱
- 캐시 시스템
- 로그 파일 관리

## 📝 JavaScript 구현 방법
```javascript
class ChunkedList {
  constructor(chunkSize = 10) {
    this.chunkSize = chunkSize;
    this.chunks = [];
    this.size = 0;
  }
  
  // 청크 클래스
  static Chunk = class {
    constructor(size) {
      this.data = new Array(size);
      this.length = 0;
      this.next = null;
    }
  }
  
  // 삽입, 삭제, 탐색 메서드들...
}
```

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스] 해시 문제들
- [프로그래머스] 스택/큐 문제들