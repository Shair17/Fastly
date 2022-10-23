export const randomPick = (values: string[]) => {
  const index = Math.floor(Math.random() * values.length);
  return values[index];
};
