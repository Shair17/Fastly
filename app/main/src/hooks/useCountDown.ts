import {useState} from 'react';
import {useInterval} from './useInterval';
import {minutesToSeconds} from 'date-fns';

// Considerar usar:
// https://github.com/ocetnik/react-native-background-timer
// ya que si la app pasa a modo background el intervalo se pausa
// y se reanuda cuando se quita el modo background
export const useCountDown = (initialCount: number = 1) => {
  const [count, setCount] = useState(minutesToSeconds(initialCount));
  const canCountDown = count > 0;

  useInterval(
    () => {
      if (canCountDown) {
        setCount(count - 1);
      }
    },
    canCountDown ? 1e3 : undefined,
  );

  return count;
};
