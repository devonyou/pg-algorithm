function solution(clothes) {
    let result = 1;
    
    const clothesMap = new Map();
    
    for(let [name, category] of clothes){
        const count = clothesMap.get(category) || 0;
        clothesMap.set(category, count + 1);
    }
    
    for(let count of clothesMap.values()){
        result *= (count + 1);
    }
    
    return result - 1;
}