import { Type, Static } from '@sinclair/typebox';
import { UserAddressTag } from '../../shared/enums/user-address-tag.enum';
import {
	LATITUDE_REGEX,
	LONGITUDE_REGEX,
	PHONE_NUMBER_REGEX,
	DNI_REGEX,
} from '../../constants/regex.constants';

export const UpdateNewUserBody = Type.Object(
	{
		avatar: Type.Optional(Type.String()),
		email: Type.String({ format: 'email' }),
		phone: Type.RegEx(PHONE_NUMBER_REGEX),
		dni: Type.RegEx(DNI_REGEX),
		address: Type.Object(
			{
				name: Type.String(),
				street: Type.String(),
				instructions: Type.String(),
				zip: Type.String(),
				city: Type.String(),
				tag: Type.Enum(UserAddressTag),
				latitude: Type.Number(Type.RegEx(LATITUDE_REGEX)),
				longitude: Type.Number(Type.RegEx(LONGITUDE_REGEX)),
			},
			{ additionalProperties: false }
		),
	},
	{ additionalProperties: false }
);
export type UpdateNewUserBodyType = Static<typeof UpdateNewUserBody>;
