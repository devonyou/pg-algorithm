function execute(arr: number[]) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
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
