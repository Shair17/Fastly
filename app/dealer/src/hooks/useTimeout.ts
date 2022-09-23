import {useEffect, useRef} from 'react';

export const useTimeout = (cb: () => void, delay?: number) => {
  const savedCb = useRef(cb);

  useEffect(() => {
    savedCb.current = cb;
  }, [cb]);

  useEffect(() => {
    // !delar && delay !== 0
    if (!delay) {
      return;
    }

    const id = setTimeout(() => savedCb.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
};
