function solution(progresses, speeds) {
    const days = progresses.map((p, i) => {
        const remain = 100 - p;
        const speed = speeds[i];
        return Math.ceil(remain / speed);
    })
    
    const result = [];
    let deployDay = days[0];
    let count = 1;
    
    for(let i=1; i<days.length; i++){
        const day = days[i];
        
        if(day <= deployDay){
            count++;
        } else {
            result.push(count);
            deployDay = day;
            count = 1;
        }
    }
    
    result.push(count);
    return result;
    
}