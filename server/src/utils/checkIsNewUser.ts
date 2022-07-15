import { User, UserAddress } from '@prisma/client';

type FullUser = User & {
	addresses: UserAddress[];
};

export const checkIsNewUser = (user: FullUser) => {
	if (user.addresses && user.addresses.length >= 1) {
		return false;
	}

	return true;
};
