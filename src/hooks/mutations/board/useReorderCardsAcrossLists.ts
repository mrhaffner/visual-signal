import { DraggableLocation } from 'react-beautiful-dnd';
import { BoardInterface } from '../../../types';
import { updateItemPositionAcross } from '../../../utlities/calculatePositionHelpers';
import { reorderCardsAcrossLists } from '../../../utlities/onDragEndHelpers';
import useUpdateCardPos from './useUpdateCardPos';

const useReorderCardsAcrossLists = () => {
  const updateCardPosMutation = useUpdateCardPos();

  const handleReorderCardsAcrossLists = (
    board: BoardInterface,
    source: DraggableLocation,
    destination: DraggableLocation,
    setBoard: React.Dispatch<React.SetStateAction<BoardInterface | null>>,
  ) => {
    reorderCardsAcrossLists(board, source, destination, setBoard);

    const sourceList = board.lists.find((x) => x._id === source.droppableId);
    if (!sourceList) return;

    const destinationList = board.lists.find(
      (x) => x._id === destination.droppableId,
    );
    if (!destinationList) return;

    const newPos = updateItemPositionAcross(
      destinationList.cards,
      destination.index,
    );

    const updateCardObject = {
      _id: sourceList.cards[source.index]._id,
      pos: newPos,
      idList: destination.droppableId,
      idBoard: board._id,
    };

    updateCardPosMutation({
      variables: { updateCardPosInput: updateCardObject },
    });
  };

  return handleReorderCardsAcrossLists;
};

export default useReorderCardsAcrossLists;
