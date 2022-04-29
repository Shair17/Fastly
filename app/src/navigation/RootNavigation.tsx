import React from 'react';
import {UnauthenticatedStack} from './stacks/UnauthenticatedStack';
import {AuthenticatedStack} from './stacks/AuthenticatedStack';
import {useAuthStore} from '../stores/useAuthStore';

export const RootNavigation = () => {
  // const accessToken = useAuthStore(s => s.accessToken);
  // const refreshToken = useAuthStore(s => s.refreshToken);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  if (isAuthenticated) {
    return <AuthenticatedStack />;
  }

  return <UnauthenticatedStack />;
};
