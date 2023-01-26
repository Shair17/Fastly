export const generateRandom = (): string => {
  return '';
};

export const isString = (val: unknown): val is string =>
  typeof val === 'string';

export const upperFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const trimStrings = (...strings: string[]): string[] => {
  let s: string[] = [];

  for (let index = 0; index < strings.length; index++) {
    let str = strings[index];

    if (!isString(str)) {
      str = '';
    }

    s.push(str.trim());
  }

  return s;
};

export const randomPick = (values: string[]) => {
  const index = Math.floor(Math.random() * values.length);
  return values[index];
};

export const replaceAt = (
  str: string,
  index: number,
  replacement: string,
): string => {
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
};

const objectToString = Object.prototype.toString;

export const toTypeString = (value: any) => objectToString.call(value);
