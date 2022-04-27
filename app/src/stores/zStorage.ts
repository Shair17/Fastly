import {StateStorage} from 'zustand/middleware';
import {storage} from '../storage';

// https://github.com/mrousavy/react-native-mmkv/blob/master/docs/WRAPPER_ZUSTAND_PERSIST_MIDDLEWARE.md

// Only works for strings, to use with booleans or numbers, make it a custom into a zustand create() function
export const zStorage: StateStorage = {
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  removeItem: name => {
    return storage.delete(name);
  },
};
