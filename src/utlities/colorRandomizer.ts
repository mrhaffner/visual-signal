import { colorsArray } from '../constants/colors';

export const colorRandomizer = () => {
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
};
