import {publicProcedure} from '../public';
import {authMiddleware} from '../../middlewares/auth/customer';

export const customerAuthProcedure = publicProcedure.use(authMiddleware);
