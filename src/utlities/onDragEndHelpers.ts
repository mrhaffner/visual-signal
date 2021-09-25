import { DraggableLocation } from 'react-beautiful-dnd';
import { BoardInterface } from '../types';

export const reorderLists = (
  boardData: BoardInterface,
  sourceData: DraggableLocation,
  destinationData: DraggableLocation,
  updateBoard: React.Dispatch<React.SetStateAction<BoardInterface | null>>,
) => {
  let newLists = [...boardData.lists];
  const splicedList = newLists.splice(sourceData.index, 1)[0];
  newLists.splice(destinationData.index, 0, splicedList);
  const newBoard = { ...boardData, lists: newLists };

  updateBoard(newBoard);
};

export const reorderCardsInSameList = (
  boardData: BoardInterface,
  sourceData: DraggableLocation,
  destinationData: DraggableLocation,
  updateBoard: React.Dispatch<React.SetStateAction<BoardInterface | null>>,
) => {
  const list = boardData.lists.find((x) => x._id === sourceData.droppableId);
  // @ts-ignore comment
  let newCardArray = [...list.cards];
  let splicedCard = newCardArray.splice(sourceData.index, 1)[0];
  newCardArray.splice(destinationData.index, 0, splicedCard);

  const newList = {
    ...list,
    cards: newCardArray,
  };

  const newLists = boardData.lists.map((x) =>
    x._id === sourceData.droppableId ? newList : x,
  );
  const newBoard = { ...boardData, lists: newLists };
  // @ts-ignore comment
  updateBoard(newBoard);
};

export const reorderCardsAcrossLists = (
  boardData: BoardInterface,
  sourceData: DraggableLocation,
  destinationData: DraggableLocation,
  updateBoard: React.Dispatch<React.SetStateAction<BoardInterface | null>>,
) => {
  const startList = boardData.lists.find(
    (x) => x._id === sourceData.droppableId,
  );
  // @ts-ignore comment
  const newStartCardArray = [...startList.cards];
  const splicedCard = newStartCardArray.splice(sourceData.index, 1)[0];

  const newStartList = {
    ...startList,
    cards: newStartCardArray,
  };

  const finishList = boardData.lists.find(
    (x) => x._id === destinationData.droppableId,
  );
  // @ts-ignore comment
  let newFinishCardArray = [...finishList.cards];
  newFinishCardArray.splice(destinationData.index, 0, splicedCard);

  const newFinishList = {
    ...finishList,
    cards: newFinishCardArray,
  };

  const newLists = boardData.lists.map((x) => {
    if (x._id === sourceData.droppableId) {
      return newStartList;
    } else if (x._id === destinationData.droppableId) {
      return newFinishList;
    } else {
      return x;
    }
  });
  const newBoard = { ...boardData, lists: newLists };
  // @ts-ignore comment
  updateBoard(newBoard);
};

export const addCardHelper = (
  boardData: BoardInterface,
  cardObject: any,
  listData: any,
  updateBoard: React.Dispatch<React.SetStateAction<BoardInterface | null>>,
) => {
  const foundList = boardData.lists.find((x) => x._id === listData._id);
  cardObject = { ...cardObject, _id: Math.random().toString() };
  //@ts-ignore
  let newCardArray = [...foundList.cards, cardObject];

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
