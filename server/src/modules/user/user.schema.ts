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

export const MyAddressParams = Type.Object(
	{
		id: Type.String({ format: 'uuid' }),
	},
	{
		additionalProperties: false,
	}
);
export type MyAddressParamsType = Static<typeof MyAddressParams>;

export const DeleteAddressParams = Type.Object(
	{
		id: Type.String({ format: 'uuid' }),
	},
	{
		additionalProperties: false,
	}
);
export type DeleteAddressParamsType = Static<typeof DeleteAddressParams>;

export const AddAddressBody = Type.Object(
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
);
export type AddAddressBodyType = Static<typeof AddAddressBody>;

export const MyFavoriteParams = Type.Object(
	{
		id: Type.String({ format: 'uuid' }),
	},
	{ additionalProperties: false }
);
export type MyFavoriteParamsType = Static<typeof MyFavoriteParams>;
