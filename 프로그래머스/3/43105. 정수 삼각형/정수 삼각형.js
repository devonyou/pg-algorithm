function solution(triangle) {
	for (let i = triangle.length - 2; i >= 0; i--) {
		for (let j = 0; j <= i; j++) {
			const dp1 = triangle[i + 1][j];
			const dp2 = triangle[i + 1][j + 1];

			const max = Math.max(dp1, dp2);
			triangle[i][j] += max;
		}
	}

	return triangle[0][0]
}