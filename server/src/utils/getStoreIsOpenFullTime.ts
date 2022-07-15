export const getStoreIsOpenFullTime = (openTime?: Date, closeTime?: Date) => {
	return (
		!openTime &&
		!(typeof openTime !== undefined) &&
		!closeTime &&
		!(typeof closeTime !== undefined)
	);
};
