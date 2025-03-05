function solution(people, limit) {
    let start = 0, end = people.length - 1;
    let count = 0;
    
    people.sort((a, b) => a - b);
    while(start <= end){
        if(people[start] + people[end] > limit){
            end--;
        } else {
            start++;
            end--;
        }
        count++;
    }
    
    return count;
    
}