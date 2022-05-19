import { Column } from "typeorm";
import { IsEmail } from "class-validator";
import { Base } from "./base.entity";

export abstract class UserAppBase extends Base {
  @Column()
  name: string;

  // Nullable porque facebook graph api solo devuelve {id, name} ._.
  // antes devolvía el correo, ahora ya no...
  // pediremos el correo al usuario una vez haya iniciado sesión.
  @Column({
    nullable: true,
  })
  @IsEmail()
  email?: string;

  @Column({
    nullable: true,
  })
  refreshToken?: string | null;

  @Column({
    default: false,
    nullable: true,
    name: "is_banned",
  })
  isBanned?: boolean;

  @Column({
    nullable: true,
    name: "ban_reason",
  })
  banReason?: string;
}
