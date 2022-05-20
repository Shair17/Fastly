export const getDefaultAvatar = (size?: number) => {
	if (size) {
		return `https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/c_scale,w_${size.toString()}/v1625622757/defaults/avatars/fastly_default_wqjsjw.jpg`;
	}

	return `https://res.cloudinary.com/fastly-delivery-app-peru/image/upload/v1625622757/defaults/avatars/fastly_default_wqjsjw.jpg`;
};
