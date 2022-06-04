import {useEffect, useRef} from 'react';

export const useInterval = (cb: () => void, delay?: number) => {
  const savedCb = useRef(cb);

  useEffect(() => {
    savedCb.current = cb;
  }, [cb]);

  useEffect(() => {
    if (!delay) {
      return;
    }

    const id = setInterval(() => savedCb.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};
