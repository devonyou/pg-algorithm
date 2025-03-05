function solution(n) {
    const count = toBinary(n).match(/1/g).length;
    let p = n + 1;
    
    while(toBinary(p).match(/1/g).length !== count){
        p++;
    }
    
    return p;
    
}

function toBinary (num){
    let binary = '';
    
    while(num > 0){
        binary = num % 2 + binary;
        num = Math.floor(num / 2)
    }
    
    return binary
}
