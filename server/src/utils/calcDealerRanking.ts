import { DealerRanking } from '@prisma/client';

export const calcDealerRanking = (rankings: DealerRanking[]) => {
  let sum = 0;

  if (!rankings || rankings.length === 0) return sum;

  for (const ranking of rankings) {
    sum += ranking.value;
  }

  return Math.round(sum / rankings.length);
};
