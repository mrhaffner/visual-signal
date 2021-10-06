import { OnDragEndHelperFn } from '../../types';

const reorderCardsInSameList: OnDragEndHelperFn = (
  boardData,
  sourceData,
  destinationData,
  updateBoard,
) => {
  const list = boardData.lists.find((x) => x._id === sourceData.droppableId);
  if (!list) return;

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
  updateBoard(newBoard);
};

export default reorderCardsInSameList;
