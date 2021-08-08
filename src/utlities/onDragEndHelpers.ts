import { DraggableLocation } from 'react-beautiful-dnd';
import { ListInterface } from '../types';

export const reorderLists = (
  boardData: ListInterface[],
  sourceData: DraggableLocation,
  destinationData: DraggableLocation,
  updateBoard: React.Dispatch<React.SetStateAction<ListInterface[]>>,
) => {
  const newBoard = [...boardData];
  const splicedList = newBoard.splice(sourceData.index, 1)[0];
  newBoard.splice(destinationData.index, 0, splicedList);

  updateBoard(newBoard);
};

export const reorderCardsInSameList = (
  boardData: ListInterface[],
  sourceData: DraggableLocation,
  destinationData: DraggableLocation,
  updateBoard: React.Dispatch<React.SetStateAction<ListInterface[]>>,
) => {
  const list = boardData.find((x) => x._id === sourceData.droppableId);
  // @ts-ignore comment
  const newCardArray = [...list.cards];
  const splicedCard = newCardArray.splice(sourceData.index, 1)[0];
  newCardArray.splice(destinationData.index, 0, splicedCard);

  const newList = {
    ...list,
    cards: newCardArray,
  };

  const newBoard = boardData.map((x) =>
    x._id === sourceData.droppableId ? newList : x,
  );
  // @ts-ignore comment
  updateBoard(newBoard);
};

export const reorderCardsAcrossLists = (
  boardData: ListInterface[],
  sourceData: DraggableLocation,
  destinationData: DraggableLocation,
  updateBoard: React.Dispatch<React.SetStateAction<ListInterface[]>>,
) => {
  const startList = boardData.find((x) => x._id === sourceData.droppableId);
  // @ts-ignore comment
  const newStartCardArray = [...startList.cards];
  const splicedCard = newStartCardArray.splice(sourceData.index, 1)[0];

  const newStartList = {
    ...startList,
    cards: newStartCardArray,
  };

  const finishList = boardData.find(
    (x) => x._id === destinationData.droppableId,
  );
  // @ts-ignore comment
  const newFinishCardArray = [...finishList.cards];
  newFinishCardArray.splice(destinationData.index, 0, splicedCard);

  const newFinishList = {
    ...finishList,
    cards: newFinishCardArray,
  };

  const newBoard = boardData.map((x) => {
    if (x._id === sourceData.droppableId) {
      return newStartList;
    } else if (x._id === destinationData.droppableId) {
      return newFinishList;
    } else {
      return x;
    }
  });
  // @ts-ignore comment
  updateBoard(newBoard);
};
