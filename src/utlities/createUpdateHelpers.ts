import { ListData, CardData, ListInterface } from '../types';

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

export const deleteListState = (
  listId: string,
  boardState: ListInterface[],
  setBoardState: React.Dispatch<React.SetStateAction<ListInterface[]>>,
) => {
  const newBoard = boardState.filter((x) => x._id !== listId);
  setBoardState(newBoard);
};

export const addCardState = (
  { content, index, listId }: CardData,
  boardState: ListInterface[],
  setBoardState: React.Dispatch<React.SetStateAction<ListInterface[]>>,
) => {
  const card = {
    //need to feed proper ID
    _id: `${Math.random()}`,
    content,
    index,
    listId,
  };

  // @ts-ignore comment
  const cardList = boardState.find((x) => x._id === listId).cards;
  const newCardList = [...cardList, card];

  const newBoard = boardState.map((x) =>
    x._id === listId ? { ...x, cards: newCardList } : x,
  );
  setBoardState(newBoard);
};

export const deleteCardState = (
  listId: string,
  cardId: string,
  boardState: ListInterface[],
  setBoardState: React.Dispatch<React.SetStateAction<ListInterface[]>>,
) => {
  // @ts-ignore comment
  const cardList = boardState.find((x) => x._id === listId).cards;
  // @ts-ignore comment
  const newCardList = cardList.filter((x) => x._id !== cardId);

  const newBoard = boardState.map((x) =>
    x._id === listId ? { ...x, cards: newCardList } : x,
  );
  setBoardState(newBoard);
};
