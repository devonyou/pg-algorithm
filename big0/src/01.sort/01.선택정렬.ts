function execute(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }

        [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
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
