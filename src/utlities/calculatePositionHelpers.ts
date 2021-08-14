export const newItemPosition = (arr: any) => {
  return arr.length ? arr[arr.length - 1].pos + 65536 : 65535;
};
