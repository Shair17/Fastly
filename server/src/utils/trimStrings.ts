export const trimStrings = (...strings: string[]) => {
	let s: string[] = [];

	strings.forEach((v) => {
		s.push(v.trim());
	});

	return s;
};
