import {publicProcedure} from '../public';
import {authMiddleware} from '../../middlewares/auth/admin';

export const adminAuthProcedure = publicProcedure.use(authMiddleware);
