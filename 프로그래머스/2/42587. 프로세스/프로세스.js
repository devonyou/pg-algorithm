function solution(priorities, location) {
    let result = 0;
    const queue = priorities.map((v, i) => [v, i]);
    
    while(queue.length > 0){
        const [priority, index] = queue.shift();
        
        if(queue.some(([p]) => p > priority)){
            queue.push([priority, index])
        } else {
            result++;
            if(index === location){
                return result;
            }
        }
    }
}