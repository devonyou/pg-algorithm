function solution(n, words) {
    let result = [0, 0];

	for (let i = 0; i < words.length; i++) {
		const people = (i % n) + 1;
		const turn = Math.ceil((i + 1) / n);

		if (i > 0) {
			const lastChar = words[i - 1].slice(-1);
			if (words[i].slice(0, 1) !== lastChar) {
				result = [people, turn];
				break;
			}

			if (words.indexOf(words[i]) < i) {
				result = [people, turn];
				break;
			}
		}
	}

	return result;
    
}