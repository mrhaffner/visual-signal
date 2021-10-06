import { DraggableLocation } from 'react-beautiful-dnd';
import { BoardInterface } from '../../../types';
import { updateItemPosition } from '../../../utlities/calculatePositionHelpers';
import reorderCardsInSameList from '../../../utlities/onDragEndHelpers/reorderCardsInSameList';
import useUpdateCardPos from './useUpdateCardPos';

const useReorderCardsSameList = () => {
  const updateCardPosMutation = useUpdateCardPos();

  const handleReorderCardsSameList = (
    board: BoardInterface,
    source: DraggableLocation,
    destination: DraggableLocation,
    setBoard: React.Dispatch<React.SetStateAction<BoardInterface | null>>,
  ) => {
    reorderCardsInSameList(board, source, destination, setBoard);
    const list = board.lists.find((x) => x._id === source.droppableId);
    if (!list) return;

    const newPos = updateItemPosition(
      list.cards,
      destination.index,
      source.index,
    );
    const updateCardObject = {
      _id: list.cards[source.index]._id,
      pos: newPos,
      idBoard: board._id,
    };

    updateCardPosMutation({
      variables: { updateCardPosInput: updateCardObject },
    });
  };

  return handleReorderCardsSameList;
};

export default useReorderCardsSameList;
