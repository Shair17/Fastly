import {trpc} from '../trpc';
import {TRPCError} from '@trpc/server';
import {z} from 'zod';
import {publicProcedure} from '../procedures/public';
import {authService} from '../services/auth.service';
import {userAuthProcedure} from '../procedures/auth/user';
import {trimStrings} from '../utils/string';
import {buildFacebookApiUri} from '../utils/facebook';
import {httpService} from '../shared/services/http.service';
import {FacebookGraphApiResponse, UserPayload} from '../types';
import {defaultAvatarUri} from '../constants/app';
import {tokenService} from '../shared/services/token.service';

const adminAuthRoute = trpc.router({});

const userAuthRoute = trpc.router({
  loginWithFacebook: publicProcedure
    .input(
      z.object({
        accessToken: z.string(),
        userID: z.string(),
      }),
    )
    .mutation(async ({ctx, input}) => {
      let facebookId: string = '',
        name: string = '';

      const [facebookAccessToken, facebookUserID] = trimStrings(
        input.accessToken,
        input.userID,
      );

      const FACEBOOK_API_URI = buildFacebookApiUri(facebookAccessToken);

      try {
        const response = await httpService.get<FacebookGraphApiResponse>(
          FACEBOOK_API_URI,
        );
        facebookId = response.data.id;
        name = response.data.name;
      } catch (error) {
        throw new TRPCError({
          code: 'NOT_FOUND',
        });
      }

      if (facebookUserID !== facebookId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const user = await ctx.app.prisma.user.findUnique({
        where: {
          facebookId,
        },
      });

      // Crear un nuevo usuario
      if (!user) {
        const newUser = await ctx.app.prisma.user.create({
          data: {
            name,
            facebookId,
            facebookAccessToken,
            avatar: defaultAvatarUri,
          },
        });

        const payload: UserPayload = {
          id: newUser.id,
          name: newUser.name,
          facebookId: newUser.facebookId,
        };

        const tokens = tokenService.generateTokens({
          payload,
          accessToken: {
            expiresIn: ctx.app.config.JWT_USER_SECRET_EXPIRES_IN,
            secret: ctx.app.config.JWT_USER_SECRET,
          },
          refreshToken: {
            expiresIn: ctx.app.config.JWT_USER_REFRESH_SECRET_EXPIRES_IN,
            secret: ctx.app.config.JWT_USER_REFRESH_SECRET,
          },
        });

        try {
          await ctx.app.prisma.user.update({
            where: {
              id: newUser.id,
            },
            data: {
              refreshToken: tokens.refreshToken,
            },
          });
        } catch (error) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
          });
        }

        return {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        };
      }

      if (user.isBanned) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `${user.name}, haz sido baneado de Fastly. Razón: ${user.banReason}`,
        });
      }

      const payload: UserPayload = {
        id: user.id,
        name: user.name,
        facebookId: user.facebookId,
      };

      const tokens = tokenService.generateTokens({
        payload,
        accessToken: {
          expiresIn: ctx.app.config.JWT_USER_SECRET_EXPIRES_IN,
          secret: ctx.app.config.JWT_USER_SECRET,
        },
        refreshToken: {
          expiresIn: ctx.app.config.JWT_USER_REFRESH_SECRET_EXPIRES_IN,
          secret: ctx.app.config.JWT_USER_REFRESH_SECRET,
        },
      });

      try {
        await ctx.app.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            refreshToken: tokens.refreshToken,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    }),

  refreshFacebookToken: publicProcedure
    .input(
      z.object({
        refreshToken: z.string(),
      }),
    )
    .mutation(async () => {}),

  logOutFromFacebook: userAuthProcedure.mutation(async ({ctx}) => {
    ctx.res.removeHeader('authorization');

    try {
      await ctx.app.prisma.user.update({
        where: {
          id: ctx.req.user.id,
        },
        data: {
          refreshToken: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      });
    }

    return {
      success: true,
    };
  }),
});

const customerAuthRoute = trpc.router({});

const dealerAuthRoute = trpc.router({});

export const authRoute = trpc.router({
  admin: adminAuthRoute,
  user: userAuthRoute,
  customer: customerAuthRoute,
  dealer: dealerAuthRoute,
});
