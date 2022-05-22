import {http} from './http.service';
import {LogInWithFacebookType} from '../interfaces/appInterfaces';

export class AuthService {
  private readonly http = http;

  async logInWithFacebook({accessToken, userID}: LogInWithFacebookType) {
    return this.http.post('/auth/facebook', {accessToken, userID});
  }
}
