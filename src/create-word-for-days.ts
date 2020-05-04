import { addDays } from './utils/date';

export default function createWordForDays(words: string[], dayCount: number) {
  const copyWords = Array.from(words);
  const wordsByDay: Array<string[]> = [[]];
  let itemLength = 5;

  while (copyWords.length) {
    const lastDay = wordsByDay[wordsByDay.length - 1];

    if (lastDay.length === itemLength) {
      wordsByDay[wordsByDay.length] = [];
      continue;
    }
    const item = copyWords.shift();

    if (!item) {
      continue;
    }

    lastDay.push(item);
    const maps: any = {
      25: 6,
      50: 7,
      100: 8,
      130: 9,
      150: 10,
      180: 11,
      210: 12,
      250: 14,
      300: 14,
    };
    itemLength = maps[wordsByDay.length as any] || itemLength;
  }

  return wordsByDay
    .map((items, index) => ({
      text: items.join(', '),
      wordCount: items.length,
      row: index * 6 + 1,
      id: 'D',
      date: addDays(new Date(), index),
    }))
    .map((item) => item.text);
}
