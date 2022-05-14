import { Column } from "typeorm";
import { IsEmail } from "class-validator";
import { Base } from "./base.entity";
import { getDefaultAvatar } from "../../utils/getDefaultAvatar";

const defaultAvatar = getDefaultAvatar(100);

export abstract class UserBase extends Base {
  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({
    default: defaultAvatar,
  })
  avatar?: string;

  @Column()
  birth_date: Date;

  @Column({
    default: false,
    nullable: true,
  })
  is_banned?: boolean;

  @Column({
    nullable: true,
  })
  ban_reason?: string;

  @Column({
    default: false,
  })
  is_active: boolean;
}
