function solution(s) {
    const answer = [0, 0];
    
    while(s !== '1'){
        const zeroCount = s.replace(/1/g, '').length;
        const length = s.replace(/0/g, '').length;
        s = toBinary(length);
        
        answer[0]++;
        answer[1] += zeroCount;
    }
    
    return answer;
}

function toBinary(n){
    let binary = '';
    while(n>0){
        binary = `${n % 2}` + binary;
        n = Math.floor(n / 2);
    }
    return binary;
}