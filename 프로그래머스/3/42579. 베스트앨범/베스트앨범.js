// {4:['pop', 2500], 3:['classic', 800], 1:['pop', 600], 0: ['classic', 500], 2:['classic', 150]}

function solution(genres, plays) {
    const result = [];
    const sumObj = {};
    
    const playObj = plays.reduce((acc, v, i) => {
        const genre = genres[i];
        const temp = [genre, v];
        acc[i] = temp
        
        const sum = genre in sumObj ? sumObj[genre] + v : v;
        sumObj[genre] = sum;
        
        return acc;
    }, {})
    
    const playEntries = Object.entries(playObj).sort((a, b) => b[1][1] - a[1][1]);
    const sumEntries = Object.entries(sumObj).sort((a, b) => b[1] - a[1]);
    
    sumEntries.map((v, i) => {
        let count = 0;
        const genre = v[0];
        
        playEntries.map((p, j) => {
            if(count < 2 && p[1][0] === genre){
                result.push(+p[0]);
                count++;
            }
        })
    })
    
    return result
}