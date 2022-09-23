export const addMinutesToDate = (date: Date, minutes = 1) => {
  return new Date(date.getTime() + minutes * 60000);
};
