import { Column } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Base } from './base.entity';

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
	refreshToken?: string;

	@Column({
		default: false,
		nullable: true,
	})
	is_banned?: boolean;

	@Column({
		nullable: true,
	})
	ban_reason?: string;

	// * Creo que no es necesario tener una columna indicando si el usuario está activo
	// @Column({
	// 	default: false,
	// })
	// is_active: boolean;
}
