class Stack {
    constructor(){
        this.items = [];
    }
    
    push(data){
        this.items.push(data)
    }
    
    pop(){
        return this.items.pop();
    }
    
    peek(){
        if(!this.items.length) return null;
        return this.items[this.items.length - 1];
    }
    
    isEmpty(){
        return !this.items.length;
    }
}

function solution(s){
    if(s.startsWith(')')) return false;
    
    const stack = new Stack();
    
    for(let c of s){
        if(c === '('){
            stack.push(c);
        } else {
            stack.pop();
        }
    }
    
    return stack.isEmpty();
}