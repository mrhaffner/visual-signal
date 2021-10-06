import { OnDragEndHelperFn } from '../../types';

const reorderCardsAcrossLists: OnDragEndHelperFn = (
  boardData,
  sourceData,
  destinationData,
  updateBoard,
) => {
  const startList = boardData.lists.find(
    (x) => x._id === sourceData.droppableId,
  );
  if (!startList) return;
  const newStartCardArray = [...startList.cards];
  const splicedCard = newStartCardArray.splice(sourceData.index, 1)[0];

  const newStartList = {
    ...startList,
    cards: newStartCardArray,
  };

  const finishList = boardData.lists.find(
    (x) => x._id === destinationData.droppableId,
  );
  if (!finishList) return;
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
  updateBoard(newBoard);
};

export default reorderCardsAcrossLists;
