export const configSchema = {
	type: 'object',
	required: [
		'PORT',

		'DATABASE_TYPE',
		'DATABASE_HOST',
		'DATABASE_PORT',
		'DATABASE_USERNAME',
		'DATABASE_PASSWORD',
		'DATABASE_NAME',

		'JWT_USER_SECRET',
		'JWT_USER_SECRET_EXPIRES_IN',
		'JWT_USER_REFRESH_SECRET',
		'JWT_USER_REFRESH_SECRET_EXPIRES_IN',
		'JWT_ADMIN_SECRET',
		'JWT_ADMIN_SECRET_EXPIRES_IN',
		'JWT_ADMIN_REFRESH_SECRET',
		'JWT_ADMIN_REFRESH_SECRET_EXPIRES_IN',
		'JWT_CUSTOMER_SECRET',
		'JWT_CUSTOMER_SECRET_EXPIRES_IN',
		'JWT_CUSTOMER_REFRESH_SECRET',
		'JWT_CUSTOMER_REFRESH_SECRET_EXPIRES_IN',
		'JWT_DEALER_SECRET',
		'JWT_DEALER_SECRET_EXPIRES_IN',
		'JWT_DEALER_REFRESH_SECRET',
		'JWT_DEALER_REFRESH_SECRET_EXPIRES_IN',
	],
	properties: {
		PORT: {
			type: 'string',
		},

		DATABASE_TYPE: {
			type: 'string',
		},
		DATABASE_HOST: {
			type: 'string',
		},
		DATABASE_PORT: {
			type: 'number',
		},
		DATABASE_USERNAME: {
			type: 'string',
		},
		DATABASE_PASSWORD: {
			type: 'string',
		},
		DATABASE_NAME: {
			type: 'string',
		},

		JWT_USER_SECRET: {
			type: 'string',
		},
		JWT_USER_SECRET_EXPIRES_IN: {
			type: 'string',
		},
		JWT_USER_REFRESH_SECRET: {
			type: 'string',
		},
		JWT_USER_REFRESH_SECRET_EXPIRES_IN: {
			type: 'string',
		},
		JWT_ADMIN_SECRET: {
			type: 'string',
		},
		JWT_ADMIN_SECRET_EXPIRES_IN: {
			type: 'string',
		},
		JWT_ADMIN_REFRESH_SECRET: {
			type: 'string',
		},
		JWT_ADMIN_REFRESH_SECRET_EXPIRES_IN: {
			type: 'string',
		},
		JWT_CUSTOMER_SECRET: {
			type: 'string',
		},
		JWT_CUSTOMER_SECRET_EXPIRES_IN: {
			type: 'string',
		},
		JWT_CUSTOMER_REFRESH_SECRET: {
			type: 'string',
		},
		JWT_CUSTOMER_REFRESH_SECRET_EXPIRES_IN: {
			type: 'string',
		},
		JWT_DEALER_SECRET: {
			type: 'string',
		},
		JWT_DEALER_SECRET_EXPIRES_IN: {
			type: 'string',
		},
		JWT_DEALER_REFRESH_SECRET: {
			type: 'string',
		},
		JWT_DEALER_REFRESH_SECRET_EXPIRES_IN: {
			type: 'string',
		},
	},
};
