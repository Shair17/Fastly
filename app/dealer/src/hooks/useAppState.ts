import {useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

interface Props {
  onChange?: (status: AppStateStatus) => void;
  onForeground?: () => void;
  onBackground?: () => void;
}

export const useAppState = ({
  onBackground,
  onChange,
  onForeground,
}: Props = {}) => {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );

  useEffect(() => {
    function onChange(newState: AppStateStatus) {
      if (newState === 'active' && appState !== 'active') {
        if (onForeground && typeof onForeground === 'function') {
          onForeground();
        }
      } else if (
        appState === 'active' &&
        newState.match(/inactive|background/)
      ) {
        if (onBackground && typeof onBackground === 'function') {
          onBackground();
        }
      }

      setAppState(newState);

      if (onChange && typeof onChange === 'function') {
        onChange(newState);
      }
    }

    const subscription = AppState.addEventListener('change', onChange);

    return () => subscription.remove();
  }, [onChange, onForeground, onBackground, appState]);

  return appState;
};

export type {AppStateStatus};
