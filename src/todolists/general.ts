import EventBusClass from '../lib/event-bus';
import { addDays } from '../utils/date';

declare const SHEET: any;
declare const EventBus: EventBusClass;

const DAY = 365;

const todos = [
  '1 tane ingilizce ders izle',
  'kitaptan 1 konu coz',
  'metin oku',
  'konu dinle',
  '1 tane ingilizce ders izle',
  'kitaptan 1 konu coz',
  'metin oku',
  'konu dinle',
].map((todo, index) => ({ todo, cell: `D${index + 1}` }));

const ROW_COUNT = DAY * (todos.length + 1);

const TEMPLATE_ROW_COUNT = todos.length + 1;

function cellCenter(cell: any) {
  cell.setVerticalAlignment('middle');
  cell.setHorizontalAlignment('center');
  return cell;
}

function isLineRow(row: number) {
  return row % TEMPLATE_ROW_COUNT === 0;
}

function isFirstLine(row: number) {
  return row === TEMPLATE_ROW_COUNT;
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

function createTemplates() {
  rowEach((row) => {
    if (isLineRow(row)) {
      const templateNumber = row / TEMPLATE_ROW_COUNT;
      /* LINE */
      const hrRange = SHEET.getRange(`A${row}:F${row}`);
      hrRange.setBackground('black');
      hrRange.merge();
      SHEET.setRowHeight(row, 3);

      /* TEMPLATE NUMBER */
      const numberRange = SHEET.getRange(`A${row - todos.length}:A${row - 1}`);
      numberRange.merge();
      cellCenter(numberRange);
      numberRange.setValue(templateNumber);

      /* DATE */
      const dateRange = SHEET.getRange(`B${row - todos.length}:B${row - 1}`);
      dateRange.merge();
      cellCenter(dateRange);
      dateRange.setValue(addDays(new Date(), templateNumber - 1));

      Array.from(todos)
        .reverse()
        .forEach(({ cell, todo }, index) => {
          SHEET.getRange(`C${row - (index + 1)}`).insertCheckboxes();

          cellCenter(SHEET.getRange(`D${row - (index + 1)}`)).setValue(
            isFirstLine(row) ? todo : `=${cell}`
          );
        });

      SHEET.setColumnWidth(3 /* C */, 35);
    } else {
      SHEET.setRowHeight(row, 35);
    }
  });
}

EventBus.addEventListener('createTemplates', createTemplates);
