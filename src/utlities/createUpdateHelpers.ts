import { ListData, CardData, ListInterface } from '../types';

export const addListState = (
  { name, pos }: ListData,
  boardState: ListInterface[],
  setBoardState: React.Dispatch<React.SetStateAction<ListInterface[]>>,
) => {
  const list = {
    //need to feed proper ID
    _id: `${Math.random()}`,
    name,
    pos,
    cards: [],
  };
  const newBoard = [...boardState, list];
  setBoardState(newBoard);
};

export const deleteListState = (
  idList: string,
  boardState: ListInterface[],
  setBoardState: React.Dispatch<React.SetStateAction<ListInterface[]>>,
) => {
  const newBoard = boardState.filter((x) => x._id !== idList);
  setBoardState(newBoard);
};

export const addCardState = (
  { name, pos, idList }: CardData,
  boardState: ListInterface[],
  setBoardState: React.Dispatch<React.SetStateAction<ListInterface[]>>,
) => {
  const card = {
    //need to feed proper ID
    _id: `${Math.random()}`,
    name,
    pos,
    idList,
  };

  // @ts-ignore comment
  const cardList = boardState.find((x) => x._id === idList).cards;
  const newCardList = [...cardList, card];

  const newBoard = boardState.map((x) =>
    x._id === idList ? { ...x, cards: newCardList } : x,
  );
  setBoardState(newBoard);
};

export const deleteCardState = (
  idList: string,
  cardId: string,
  boardState: ListInterface[],
  setBoardState: React.Dispatch<React.SetStateAction<ListInterface[]>>,
) => {
  // @ts-ignore comment
  const cardList = boardState.find((x) => x._id === idList).cards;
  // @ts-ignore comment
  const newCardList = cardList.filter((x) => x._id !== cardId);

  const newBoard = boardState.map((x) =>
    x._id === idList ? { ...x, cards: newCardList } : x,
  );
  setBoardState(newBoard);
};
