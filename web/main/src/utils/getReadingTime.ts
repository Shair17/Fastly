import readingTime from 'reading-time';

export const getReadingTime = (text: string) => {
  return readingTime(text);
};
