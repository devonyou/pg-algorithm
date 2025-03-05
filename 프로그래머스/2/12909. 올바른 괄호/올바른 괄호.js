function solution(s){
    if(s.startsWith(')')) return false;
    
    let stack = [];

	for (let char of s) {
		if (char === '(') stack.push(0);
		if (char === ')') stack.pop();
	}

	return !stack.length;
}