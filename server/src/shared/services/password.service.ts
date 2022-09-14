import {Service} from 'fastify-decorators';
import * as argon2 from 'argon2';
import {PASSWORD_REGEX} from '../../constants/regex';
import {InternalServerError} from 'http-errors';

@Service('PasswordServiceToken')
export class PasswordService {
  private readonly argon2: typeof argon2 = argon2;

  isValidPassword(password: string): boolean {
    return PASSWORD_REGEX.test(password);
  }

  hash(password: string): Promise<string> {
    try {
      return this.argon2.hash(password);
    } catch (error) {
      console.log('Error at hashing password ->', error);

      throw new InternalServerError();
    }
  }

  verify(
    hash: string,
    plain: string | Buffer,
    options?: argon2.Options | undefined,
  ): Promise<boolean> {
    try {
      return this.argon2.verify(hash, plain, options);
    } catch (error) {
      console.log('Error at verify password hash ->', error);

      throw new InternalServerError();
    }
  }
}
