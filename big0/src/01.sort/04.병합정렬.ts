function merge(arr: number[], left: number, mid: number, right: number) {
    let i = left;
    let j = mid + 1;
    let k = left;
    const sorted = [];

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) sorted[k++] = arr[i++];
        else sorted[k++] = arr[j++];
    }

    if (i > mid) {
        // 왼쪽 배열의 처리가 끝난경우
        for (; j <= right; j++) sorted[k++] = arr[j];
    } else {
        // 오른쪽 배열의 처리가 끝난경우
        for (; i <= mid; i++) sorted[k++] = arr[i];
    }

    // 정렬된 배열을 원래 배열에 복사
    for (let x = left; x <= right; x++) {
        arr[x] = sorted[x];
    }
}

function mergeSort(arr: number[], left: number, right: number) {
    // 원소가 2개 이상인경우
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSort(arr, left, mid); // 왼쪽 배열 정렬수행
        mergeSort(arr, mid + 1, right); // 오른쪽 배열 정렬수행
        merge(arr, left, mid, right); // 정렬된 배열 병합
    }

    return arr;
}

const arr = Array.from({ length: 30000 }, () =>
    Math.floor(Math.random() * 1000),
);
const startTime = new Date().getTime();
const result = mergeSort(arr, 0, arr.length - 1);
const endTime = new Date().getTime();

console.log(result);
console.log(endTime - startTime);
