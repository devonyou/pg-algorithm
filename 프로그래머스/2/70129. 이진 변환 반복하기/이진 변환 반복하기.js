function solution(s) {
    const answer1 = [0, 0];
    
    while(s !== '1'){
        const zeroCount = s.replace(/1/g, '').length;
        const length = s.replace(/0/g, '').length;
        s = toBinary(length);
        
        answer1[0]++;
        answer1[1] += zeroCount;
    }
    
    return answer1;
}

function toBinary(n){
    let binary = '';
    while(n>0){
        binary = `${n % 2}` + binary;
        n = Math.floor(n / 2);
    }
    return binary;
}