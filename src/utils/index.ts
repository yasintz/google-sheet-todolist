export function hasItemInArray(arr: any[], item: any) {
  return arr.indexOf(item) > -1;
}

export function createArray(length: number) {
  return new Array(length).fill('');
}
