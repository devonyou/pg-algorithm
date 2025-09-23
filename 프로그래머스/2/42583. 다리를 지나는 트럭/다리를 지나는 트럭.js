function solution(bridge_length, weight, trucks) {
    const queue = Array(bridge_length).fill(0);
    let time = 0;
    let totalWeight = 0;
    
    while(trucks.length || totalWeight){
        time++;
        totalWeight -= queue.shift();
        
        if(trucks.length){
            const nextTruck = trucks[0];
            
            if(totalWeight + nextTruck <= weight){
                queue.push(nextTruck);
                trucks.shift()
                totalWeight += nextTruck;
            } else {
                queue.push(0);
            }
        } else {
            queue.push(0)
        }
    }
    
    return time;
}