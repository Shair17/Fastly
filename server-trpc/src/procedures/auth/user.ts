import {publicProcedure} from '../public';
import {authMiddleware} from '../../middlewares/auth/user';

export const userAuthProcedure = publicProcedure.use(authMiddleware);
