function solution(n) {
	let count = 0;
	let sum = 1;
	let p1 = 1;
	let p2 = 2;

	while (p1 < p2) {
		if (sum < n) {
			sum += p2;
			p2++;
		} else if (sum > n) {
			sum -= p1;
			p1++;
		} else {
			sum = sum - p1 + p2;
			p1++;
			p2++;
			count++;
		}
	}

	return count;
}