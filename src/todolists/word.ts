import createWordForDays from '../utils/create-word-for-days';
import EventBusClass from '../lib/event-bus';
import { addDays } from '../utils/date';
import { createArray } from '../utils';

declare const SHEET: any;
declare const WORDS: string[];
declare const EventBus: EventBusClass;

const DAY = 365;

const ROW_COUNT = DAY * 6;

const cells = [13, 26, 39, 130];

const WORD_COL = 'E';

const tasks = [
  'Oku ve Dinle',
  'Ezberle',
  'Zaman',
  'Dinle ve Kullan',
  'Tekrar Kullan',
];

function cellCenter(cell: any) {
  cell.setVerticalAlignment('middle');
  cell.setHorizontalAlignment('center');
  return cell;
}
function isWordCell(i: number) {
  return (i - 1) % 6 === 0;
}
function rowEach(fn: (row: number, cancel: () => void) => void) {
  let isDone = false;
  const cancel = () => {
    isDone = true;
  };
  for (let i = 1; i <= ROW_COUNT; i++) {
    if (isDone) {
      return;
    }
    fn(i, cancel);
  }
}

function handleRow(row: number, fn: (row: number) => void) {
  if (row <= ROW_COUNT) {
    fn(row);
  }
}

function setRef(i: number) {
  if (isWordCell(i)) {
    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      handleRow(i + cells[cellIndex], (row) => {
        var cell = SHEET.getRange(WORD_COL + row);
        cell.setValue('=' + WORD_COL + i);
      });
    }
  }
}

function setWords() {
  let wordIndex = 0;
  const wordsForDays = createWordForDays(
    WORDS.filter((word) => word.length > 2),
    DAY
  );

  rowEach((row, cancel) => {
    if (wordIndex >= wordsForDays.length) {
      return cancel();
    }
    if (isWordCell(row)) {
      setRef(row);
      var cell = SHEET.getRange(WORD_COL + row);
      const text = wordsForDays[wordIndex];
      cell.setValue(text);
      wordIndex++;
    }
  });
}

function createTemplates() {
  rowEach((row) => {
    if (row % 6 === 0) {
      cellCenter(SHEET.getRange(`D${row - 5}`)).setValue(
        row === 6 ? 'Oku ve Dinle' : '=D1'
      );

      cellCenter(SHEET.getRange(`D${row - 4}`)).setValue(
        row === 6 ? 'Ezberle' : '=D2'
      );
      cellCenter(SHEET.getRange(`D${row - 3}`)).setValue(
        row === 6 ? 'Zaman' : '=D3'
      );
      cellCenter(SHEET.getRange(`D${row - 2}`)).setValue(
        row === 6 ? 'Kullan' : '=D4'
      );
      cellCenter(SHEET.getRange(`D${row - 1}`)).setValue(
        row === 6 ? 'Tekrar kullan' : '=D5'
      );

      createArray(5).forEach((item, index) => {
        SHEET.getRange(`C${row - (index + 1)}`).insertCheckboxes();
      });

      const templateIndex = row / 6;
      const hrRange = SHEET.getRange(`A${row}:F${row}`);
      const numberRange = SHEET.getRange(`A${row - 5}:A${row - 1}`);
      const dateRange = SHEET.getRange(`B${row - 5}:B${row - 1}`);

      cellCenter(numberRange);
      cellCenter(dateRange);
      SHEET.setRowHeight(row, 3);
      SHEET.setColumnWidth(3 /* C */, 30);

      hrRange.setBackground('black');
      hrRange.merge();

      numberRange.merge();
      numberRange.setValue(templateIndex);
      dateRange.merge();
      dateRange.setValue(addDays(new Date(), templateIndex - 1));
    } else {
      SHEET.setRowHeight(row, 35);
    }
  });
}

EventBus.addEventListener('setWords', setWords);
EventBus.addEventListener('createTemplates', createTemplates);
