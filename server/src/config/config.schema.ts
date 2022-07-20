import {Type, Static} from '@sinclair/typebox';

export const ConfigSchema = Type.Strict(
  Type.Object(
    {
      PORT: Type.Number(),
      DATABASE_URL: Type.String(),
      MAILER_TRANSPORTER_HOST: Type.String(),
      MAILER_TRANSPORTER_PORT: Type.Number(),
      MAILER_TRANSPORTER_SECURE: Type.Boolean(),
      MAILER_TRANSPORTER_USER: Type.String(),
      MAILER_TRANSPORTER_PASS: Type.String(),
      JWT_USER_SECRET: Type.String(),
      JWT_USER_SECRET_EXPIRES_IN: Type.String(),
      JWT_USER_REFRESH_SECRET: Type.String(),
      JWT_USER_REFRESH_SECRET_EXPIRES_IN: Type.String(),
      JWT_ADMIN_SECRET: Type.String(),
      JWT_ADMIN_SECRET_EXPIRES_IN: Type.String(),
      JWT_ADMIN_REFRESH_SECRET: Type.String(),
      JWT_ADMIN_REFRESH_SECRET_EXPIRES_IN: Type.String(),
      JWT_FORGOT_ADMIN_PASSWORD_SECRET: Type.String(),
      JWT_FORGOT_ADMIN_PASSWORD_SECRET_EXPIRES_IN: Type.String(),
      JWT_CUSTOMER_SECRET: Type.String(),
      JWT_CUSTOMER_SECRET_EXPIRES_IN: Type.String(),
      JWT_CUSTOMER_REFRESH_SECRET: Type.String(),
      JWT_CUSTOMER_REFRESH_SECRET_EXPIRES_IN: Type.String(),
      JWT_FORGOT_CUSTOMER_PASSWORD_SECRET: Type.String(),
      JWT_FORGOT_CUSTOMER_PASSWORD_SECRET_EXPIRES_IN: Type.String(),
      JWT_DEALER_SECRET: Type.String(),
      JWT_DEALER_SECRET_EXPIRES_IN: Type.String(),
      JWT_DEALER_REFRESH_SECRET: Type.String(),
      JWT_DEALER_REFRESH_SECRET_EXPIRES_IN: Type.String(),
      JWT_FORGOT_DEALER_PASSWORD_SECRET: Type.String(),
      JWT_FORGOT_DEALER_PASSWORD_SECRET_EXPIRES_IN: Type.String(),
    },
    {
      additionalProperties: false,
    },
  ),
);
export type ConfigSchemaType = Static<typeof ConfigSchema>;
