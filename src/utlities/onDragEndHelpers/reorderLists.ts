import { OnDragEndHelperFn } from '../../types';

const reorderLists: OnDragEndHelperFn = (
  boardData,
  sourceData,
  destinationData,
  updateBoard,
) => {
  let newLists = [...boardData.lists];
  const splicedList = newLists.splice(sourceData.index, 1)[0];
  newLists.splice(destinationData.index, 0, splicedList);
  const newBoard = { ...boardData, lists: newLists };

  updateBoard(newBoard);
};

export default reorderLists;
