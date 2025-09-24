/*
                              ___
prices = [100, 300, 500, 400, 200]
stack = [0, 4] stack은 현재까지의 최고가의 index가 저장

result[2] = 3 - 2 = 1
result[3] = 4 - 3 = 1
result[1] = 4 - 1 = 3
*/

function solution(prices) {
    const times = new Array(prices.length).fill(-1);
    const stack = [];
    
    for(let i=0; i<prices.length; i++){
        while(
            stack.length &&
            prices[i] < prices[stack[stack.length - 1]]
        ){
            const topIndex = stack.pop();
            times[topIndex] = i - topIndex;
        }
        
        stack.push(i)
    }
    
    while(stack.length){
        const index = stack.pop();
        times[index] = prices.length - index - 1;
    }
    
    return times;
}