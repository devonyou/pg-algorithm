const n = [1, 10, 50, 100, 500, 1000, 5000, 10000, 50000];
const k = 61493;

function greedy(money: number[], k: number) {
    const sortMoney = money.sort((a, b) => b - a);
    let count = 0;

    for (let i = 0; i < sortMoney.length; i++) {
        if (k === 0) break;
        count += Math.floor(k / sortMoney[i]);
        k = k % sortMoney[i];
    }

    return count;
}

const result = greedy(n, k);
console.log(result);
