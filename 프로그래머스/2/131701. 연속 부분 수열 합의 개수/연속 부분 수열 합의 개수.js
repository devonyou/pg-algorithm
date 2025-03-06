function solution(elements) {
	const result = new Set();

	for (let w = 1; w <= elements.length; w++) {
		let sum = 0;
		for (let i = 0; i < elements.length; i++) {
			if (i === 0) {
				for (let j = 0; j < w; j++) {
					sum += elements[j];
				}
			} else {
				sum -= elements[i - 1];
				sum += elements[(i + w - 1) % elements.length];
			}
			result.add(sum);
		}
	}

	return result.size;
}
