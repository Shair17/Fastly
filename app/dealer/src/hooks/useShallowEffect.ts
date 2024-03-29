import {useEffect, useRef, DependencyList} from 'react';
import {shallowEqual} from '../utils/shallowEqual';

function shallowCompare(
  prevValue: React.DependencyList,
  currValue: React.DependencyList,
) {
  if (!prevValue || !currValue) {
    return false;
  }

  if (prevValue === currValue) {
    return true;
  }

  if (prevValue.length !== currValue.length) {
    return false;
  }

  for (let i = 0; i < prevValue.length; i += 1) {
    if (!shallowEqual(prevValue[i], currValue[i])) {
      return false;
    }
  }

  return true;
}

function useShallowCompare(dependencies: DependencyList) {
  const ref = useRef<DependencyList>([]);
  const updateRef = useRef<number>(0);

  if (!shallowCompare(ref.current, dependencies)) {
    ref.current = dependencies;
    updateRef.current += 1;
  }

  return [updateRef.current];
}

export function useShallowEffect(
  cb: () => void,
  dependencies?: DependencyList,
): void {
  useEffect(cb, useShallowCompare(dependencies));
}
