function solution(numbers) {
    let result = numbers.map(String);

    result.sort((a, b) => {
        let order1 = a + b;
        let order2 = b + a;

        if (Number(order1) >= Number(order2)) return -1;
        else return 1;
    });
    
    if(result[0] === '0') return '0';

    return result.join('');
}