import { AddCardHelper, CardInterface } from '../types';

export const addCardHelper: AddCardHelper = (
  boardData,
  cardObject,
  listData,
  updateBoard,
) => {
  const foundList = boardData.lists.find((x) => x._id === listData._id);
  if (!foundList) return;

  const newCardObject = { ...cardObject, _id: Math.random().toString() };
  let newCardArray = [...foundList.cards, newCardObject];

  const newList = {
    ...listData,
    cards: newCardArray,
  };

  const newLists = boardData.lists.map((x) =>
    x._id === listData._id ? newList : x,
  );
  const newBoard = { ...boardData, lists: newLists };
  updateBoard(newBoard);
};
