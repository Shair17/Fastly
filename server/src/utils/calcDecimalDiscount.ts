export const calcDecimalDiscount = (discount: number) => {
	if (discount >= 0 && discount <= 100) {
		return discount / 100;
	}

	console.error('discount es menor a 0 o mayor a 100');

	return 0;
};