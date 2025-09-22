function solution(phone_book) {
    const phoneSet = new Set(phone_book);
    
    for(let phone of phone_book){
        for(let i=1; i<phone.length; i++){
            const prefix = phone.substring(0, i);
            if(phoneSet.has(prefix)) return false
        }
    }
    
    return true;
}