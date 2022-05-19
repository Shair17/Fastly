import { Entity } from "typeorm";
import { UserBase } from "../../shared/entities/userBase.entity";

@Entity("customers")
export class Customer extends UserBase {}
