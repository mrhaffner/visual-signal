import { useMutation } from '@apollo/client';
import { DraggableLocation } from 'react-beautiful-dnd';
import { UPDATE_LIST_POS } from '../../../graphql/mutations/all';
import { BoardInterface } from '../../../types';
import { updateItemPosition } from '../../../utlities/calculatePositionHelpers';
import { reorderLists } from '../../../utlities/onDragEndHelpers';
import useMemberContext from '../../useMemberContext';

const useUpdateListPos = () => {
  const { setMemberFound } = useMemberContext();

  const [updateListPosMutation] = useMutation(UPDATE_LIST_POS, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const handleUpdateListPos = (
    board: BoardInterface,
    source: DraggableLocation,
    destination: DraggableLocation,
    setBoard: React.Dispatch<React.SetStateAction<BoardInterface | null>>,
  ) => {
    const newPos = updateItemPosition(
      board.lists,
      destination.index,
      source.index,
    );
    const updateListObject = {
      _id: board.lists[source.index]._id,
      pos: newPos,
      idBoard: board._id,
    };
    updateListPosMutation({
      variables: { updateListPosInput: updateListObject },
    });
    reorderLists(board, source, destination, setBoard);
  };

  return handleUpdateListPos;
};

export default useUpdateListPos;
