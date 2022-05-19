import { Static, Type } from "@sinclair/typebox";

export const GetAdminParams = Type.Object({
  id: Type.String({ format: "uuid" }),
});
export type GetAdminParamsType = Static<typeof GetAdminParams>;
