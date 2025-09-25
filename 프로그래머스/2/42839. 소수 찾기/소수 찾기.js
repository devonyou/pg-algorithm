/*
* 백트래킹
*/


function isPrime(number){
    if(number < 2) return false;
    for(let i=2; i*i<=number; i++){
        if(number % i === 0) return false;
    }
    return true;
}

function solution(numbers) {
    let result = 0;
    const digits = numbers.split('');
    const set = new Set();
    
    
    function dfs(path, visited){
        if(path.length){
            set.add(Number(path.join('')));
        }
        
        if (path.length === digits.length) return;
        
        for(let i=0; i<digits.length; i++){
            if(visited[i]) continue;
            
            visited[i] = true;
            path.push(digits[i]);
            dfs(path, visited);
            path.pop();
            visited[i] = false;
        }
    }
    
    dfs([], Array(digits.length).fill(false));
    
    for(let number of set){
        if(isPrime(number)) result++;
    }
    
    return result;
}