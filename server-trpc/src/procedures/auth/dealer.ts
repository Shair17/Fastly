import {publicProcedure} from '../public';
import {authMiddleware} from '../../middlewares/auth/dealer';

export const dealerAuthProcedure = publicProcedure.use(authMiddleware);
