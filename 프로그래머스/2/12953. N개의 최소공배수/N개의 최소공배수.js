function solution(arr) {
    return arr.reduce((acc, v, i) => {
           return lcm(acc, v)
    }, 1)
}

function gcd(a, b){
    while(b !== 0){
        const temp = b;
        b = a % b;
        a = temp;
    }
    
    return a
}

function lcm(a, b){
    return (a * b) / gcd(a, b)
}