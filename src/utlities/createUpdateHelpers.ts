import { ListData, ListInterface } from '../types';

export const addListState = (
  { title, index }: ListData,
  boardState: ListInterface[],
  setBoardState: React.Dispatch<React.SetStateAction<ListInterface[]>>,
) => {
  const list = {
    //need to feed proper ID
    _id: `${Math.random()}`,
    title,
    index,
    cards: [],
  };
  const newBoard = [...boardState, list];
  setBoardState(newBoard);
};
