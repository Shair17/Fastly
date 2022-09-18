import type {ApplicationParams} from '@fastly/navigation/bottom-tabs/Root';

export const getTabBarBadge = (
  TabName: keyof ApplicationParams,
  quantity?: number,
): string | undefined => {
  if ((TabName !== 'CartStack' && TabName !== 'FavoritesStack') || !quantity)
    return undefined;

  return quantity > 99 ? `+99` : `${quantity}`;
};
