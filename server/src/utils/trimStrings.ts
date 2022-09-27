export const trimStrings = (...strings: string[]): string[] => {
  let s: string[] = [];

  strings.forEach(v => {
    // Verify this
    if (!v || v === undefined || v === null) v = '';

    s.push(v.trim());
  });

  return s;
};
