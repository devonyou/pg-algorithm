function solution(k, tangerine) {
    const obj = {};
    let count = 0;
    let sum = 0;
    
    for(let i of tangerine) {
        obj[i] = obj[i] + 1 || 1;
    }
    
    const array = Object.values(obj).sort((a, b) => b - a);
    for(let i of array){
        sum += i;
        count++;
        if(sum >= k) break;
    }
    
    return count;
}