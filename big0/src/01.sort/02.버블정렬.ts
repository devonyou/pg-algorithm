function execute(arr: number[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[i] < arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    return arr;
}

const arr = Array.from({ length: 30000 }, () =>
    Math.floor(Math.random() * 1000),
);
const startTime = new Date().getTime();
const result = execute(arr);
const endTime = new Date().getTime();

console.log(result);
console.log(endTime - startTime);
