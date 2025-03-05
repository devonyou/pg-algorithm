function solution(brown, yellow) {
    const area = brown + yellow;
    const result = [0, 0]
    
    for(let height=3; height<=Math.sqrt(area); height++){
        if(area % height === 0){
            const width = area / height;
            if((width - 2) * (height - 2) === yellow){
                result[0] = width;
                result[1] = height;
                break;   
            }
        }
    }
        
    return result
}