export const trimStrings = (...strings: string[]) => {
	let s: string[] = [];

	strings.forEach((v) => {
		// Verify this
		if (v === undefined || v === null) v = '';

		s.push(v.trim());
	});

	return s;
};
