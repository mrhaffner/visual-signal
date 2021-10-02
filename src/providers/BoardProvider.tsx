import { ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { DropResult } from 'react-beautiful-dnd';
import { BoardContext } from '../hooks/useBoardContext';
import {
  reorderCardsAcrossLists,
  reorderCardsInSameList,
  reorderLists,
} from '../utlities/onDragEndHelpers';
import { UPDATE_LIST_POS, UPDATE_CARD_POS } from '../graphql/mutations/all';
import {
  updateItemPosition,
  updateItemPositionAcross,
} from '../utlities/calculatePositionHelpers';
import { useParams } from 'react-router-dom';
import useMemberContext from '../hooks/useMemberContext';
import useGetUpdateBoard from '../hooks/queries/useGetUpdateBoard';
import useNewBoardName from '../hooks/mutations/board/useNewBoardName';
import useDeleteBoard from '../hooks/mutations/board/useDeleteBoard';
import useAddList from '../hooks/mutations/board/useAddList';
import useNewListName from '../hooks/mutations/board/useNewListName';
import useDeleteList from '../hooks/mutations/board/useDeleteList';
import useAddCard from '../hooks/mutations/board/useAddCard';
import useNewCardName from '../hooks/mutations/board/useNewCardName';
import useDeleteCard from '../hooks/mutations/board/useDeleteCard';

interface Props {
  children: ReactNode;
}

const BoardProvider = ({ children }: Props) => {
  // @ts-ignore comment
  let { boardId } = useParams();

  const { loading, error, board, setBoard } = useGetUpdateBoard(boardId);

  const { setMemberFound } = useMemberContext();

  const newBoardName = useNewBoardName(board, setBoard);
  const deleteBoard = useDeleteBoard();
  const addList = useAddList(board);
  const newListName = useNewListName(board);
  const deleteList = useDeleteList(board);
  const addCard = useAddCard(board, setBoard);
  const newCardName = useNewCardName(board);
  const deleteCard = useDeleteCard(board);

  const [updateCardPosMutation] = useMutation(UPDATE_CARD_POS, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const [updateListPosMutation] = useMutation(UPDATE_LIST_POS, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const onDragEnd = (result: DropResult) => {
    if (board === null) {
      console.log(
        "Board is null!  Don't worry, this will never actually happen.",
      );
      return;
    }

    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'list') {
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
      //can I do an optimistic update here and get rid of reoderLists()?
      updateListPosMutation({
        variables: { updateListPosInput: updateListObject },
      });
      reorderLists(board, source, destination, setBoard);

      return;
    }

    if (source.droppableId === destination.droppableId) {
      reorderCardsInSameList(board, source, destination, setBoard);
      const list = board.lists.find((x) => x._id === source.droppableId);
      const newPos = updateItemPosition(
        // @ts-ignore comment
        list.cards,
        destination.index,
        source.index,
      );
      const updateCardObject = {
        // @ts-ignore comment
        _id: list.cards[source.index]._id,
        pos: newPos,
        idBoard: board._id,
      };

      updateCardPosMutation({
        variables: { updateCardPosInput: updateCardObject },
      });
      return;
    }

    reorderCardsAcrossLists(board, source, destination, setBoard);
    const sourceList = board.lists.find((x) => x._id === source.droppableId);
    const destinationList = board.lists.find(
      (x) => x._id === destination.droppableId,
    );

    const newPos = updateItemPositionAcross(
      // @ts-ignore comment
      destinationList.cards,
      destination.index,
    );

    const updateCardObject = {
      // @ts-ignore comment
      _id: sourceList.cards[source.index]._id,
      pos: newPos,
      idList: destination.droppableId,
      idBoard: board._id,
    };

    updateCardPosMutation({
      variables: { updateCardPosInput: updateCardObject },
    });
  };

  return (
    <BoardContext.Provider
      value={{
        loading,
        error,
        board,
        onDragEnd,
        newBoardName,
        deleteBoard,
        addList,
        newListName,
        deleteList,
        addCard,
        newCardName,
        deleteCard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
