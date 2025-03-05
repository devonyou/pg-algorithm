function solution(s) {
    return s.split(' ').reduce((acc, v, i)=>{
        if(v !== ' ') {
            return acc + ` ${v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()}`;    
        } else {
            return acc;
        }
    }, '').trimStart();
}