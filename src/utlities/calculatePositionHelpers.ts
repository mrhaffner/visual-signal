import { CardInterface, ListInterface } from '../types';

export const newItemPosition = (arr: ListInterface[] | CardInterface[]) => {
  return arr.length ? arr[arr.length - 1].pos + 65536 : 65535;
};

export const updateItemPosition = (
  arr: ListInterface[] | CardInterface[],
  destIndex: number,
  sourceIndex: number,
) => {
  if (destIndex === 0) {
    return arr[0].pos / 2;
  } else if (destIndex === arr.length - 1) {
    return arr[arr.length - 1].pos + 65536;
  } else {
    const indexItem =
      destIndex + 1 === sourceIndex ? destIndex - 1 : destIndex + 1;
    return (arr[destIndex].pos + arr[indexItem].pos) / 2;
  }
};

export const updateItemPositionAcross = (
  arr: CardInterface[],
  destIndex: number,
) => {
  if (destIndex === 0 && arr.length === 0) {
    return 65535;
  } else if (destIndex === 0) {
    return arr[0].pos / 2;
  } else if (destIndex === arr.length) {
    return arr[arr.length - 1].pos + 65536;
  } else {
    return (arr[destIndex].pos + arr[destIndex - 1].pos) / 2;
  }
};
