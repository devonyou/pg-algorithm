# 활동 선택 문제 (Activity Selection Problem)

## 📋 개요
한 번에 하나의 활동만 처리할 수 있는 자원에서 가장 많은 활동을 선택하는 문제입니다.

## 🔧 문제 정의
- n개의 활동이 있고, 각 활동은 시작 시간과 종료 시간을 가짐
- 한 번에 하나의 활동만 처리 가능
- 겹치지 않는 활동들을 최대한 많이 선택

## 🔧 알고리즘 과정
1. 활동들을 종료 시간 기준으로 정렬
2. 첫 번째 활동을 선택
3. 다음 활동 중 시작 시간이 이전 활동의 종료 시간 이후인 첫 번째 활동 선택
4. 모든 활동을 확인할 때까지 반복

## ⏱️ 시간 복잡도
- 정렬: O(n log n)
- 탐색: O(n)
- 전체: O(n log n)
- 공간: O(1)

## 📝 JavaScript 구현
```javascript
function activitySelection(activities) {
  // 종료 시간 기준으로 정렬
  activities.sort((a, b) => a.end - b.end);
  
  const selected = [];
  let lastEndTime = 0;
  
  for (let i = 0; i < activities.length; i++) {
    const activity = activities[i];
    
    // 시작 시간이 이전 활동의 종료 시간 이후인지 확인
    if (activity.start >= lastEndTime) {
      selected.push(activity);
      lastEndTime = activity.end;
    }
  }
  
  return selected;
}

// 활동 객체 예시
const activities = [
  { id: 1, start: 1, end: 4 },
  { id: 2, start: 3, end: 5 },
  { id: 3, start: 0, end: 6 },
  { id: 4, start: 5, end: 7 },
  { id: 5, start: 8, end: 9 },
  { id: 6, start: 5, end: 9 }
];

// 사용 예시
const result = activitySelection(activities);
console.log('선택된 활동들:', result);
```

## 📊 동작 과정 예시
```
초기 활동들:
1: [1, 4], 2: [3, 5], 3: [0, 6], 4: [5, 7], 5: [8, 9], 6: [5, 9]

종료 시간 기준 정렬:
3: [0, 6], 1: [1, 4], 2: [3, 5], 4: [5, 7], 6: [5, 9], 5: [8, 9]

선택 과정:
1. 활동 1 선택 (종료시간: 4)
2. 활동 4 선택 (시작시간 5 ≥ 4) (종료시간: 7)
3. 활동 5 선택 (시작시간 8 ≥ 7) (종료시간: 9)

최종 선택: [1, 4, 5]
```

## 🎯 그리디 선택의 정당성
- **지역 최적해**: 매번 종료 시간이 가장 빠른 활동을 선택
- **전역 최적해**: 지역 최적해가 전역 최적해가 됨
- **증명**: 다른 해보다 더 많은 활동을 선택할 수 없음을 보장

## 🎯 활용 예시
- 회의실 스케줄링
- 강의실 배정
- 리소스 할당
- 작업 스케줄링

## 🧪 연습 문제 (프로그래머스)
- [프로그래머스 Lv.2] 큰 수 만들기
- [프로그래머스 Lv.2] 조이스틱
- [프로그래머스 Lv.3] 단속카메라