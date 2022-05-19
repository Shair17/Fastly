import { Column, Entity } from "typeorm";
import { IsString, MinLength, MaxLength } from "class-validator";
import { UserAppBase } from "../../shared/entities/userAppBase.entity";

@Entity("users")
export class User extends UserAppBase {
  @Column()
  @IsString()
  facebookId: string;

  @Column()
  @IsString()
  facebookAccessToken: string;

  @Column({
    type: "varchar",
    length: 9,
    nullable: true,
  })
  @MinLength(9)
  @MaxLength(9)
  phone?: string | null;

  @Column({
    type: "varchar",
    length: 8,
    nullable: true,
  })
  @MinLength(8)
  @MaxLength(8)
  dni?: string | null;
}
