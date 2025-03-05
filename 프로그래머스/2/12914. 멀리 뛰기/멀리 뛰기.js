function solution(n) {
//     const dp = Array.from({ length: n + 1 }, () => 1);
    
//     for(let i=2; i<=n; i++){
//         dp[i] = (dp[i - 1] + dp[i - 2]) % 1234567;
//     }
    
//     return dp[n];
    
    let p1 = 1,
		p2 = 1;
	let temp = p2;

	for (let i = 2; i <= n; i++) {
		p2 = (p1 + p2) % 1234567 ;
		p1 = temp;
		temp = p2;
	}

	return p2;
}