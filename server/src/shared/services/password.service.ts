import { Service } from 'fastify-decorators';
import * as argon2 from 'argon2';

@Service()
export class PasswordService {
	private readonly argon2: typeof argon2 = argon2;

	hash(password: string) {
		try {
			return this.argon2.hash(password);
		} catch (error) {
			throw error;
		}
	}

	verify(
		hash: string,
		plain: string | Buffer,
		options?: argon2.Options | undefined
	): Promise<boolean> {
		try {
			return this.argon2.verify(hash, plain, options);
		} catch (error) {
			throw error;
		}
	}
}