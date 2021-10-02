import { ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { CardInterface, ListInterface } from '../types';
import { DropResult } from 'react-beautiful-dnd';
import { BoardContext } from '../hooks/useBoardContext';
import {
  addCardHelper,
  reorderCardsAcrossLists,
  reorderCardsInSameList,
  reorderLists,
} from '../utlities/onDragEndHelpers';
import {
  CREATE_LIST,
  UPDATE_LIST_POS,
  DELETE_LIST,
  CREATE_CARD,
  UPDATE_CARD_POS,
  DELETE_CARD,
  UPDATE_BOARD_NAME,
  UPDATE_CARD_NAME,
  UPDATE_LIST_NAME,
  DELETE_BOARD,
} from '../graphql/mutations/all';
import {
  newItemPosition,
  updateItemPosition,
  updateItemPositionAcross,
} from '../utlities/calculatePositionHelpers';
import { useParams, useHistory } from 'react-router-dom';
import useMemberContext from '../hooks/useMemberContext';
import useGetUpdateBoard from '../hooks/queries/useGetUpdateBoard';
import useNewBoardName from '../hooks/mutations/board/useNewBoardName';
import useDeleteBoard from '../hooks/mutations/board/useDeleteBoard';
import useAddList from '../hooks/mutations/board/useAddList';
import useNewListName from '../hooks/mutations/board/useNewListName';
import useDeleteList from '../hooks/mutations/board/useDeleteList';
import useAddCard from '../hooks/mutations/board/useAddCard';

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

  const [updateCardPosMutation] = useMutation(UPDATE_CARD_POS, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const [updateCardNameMutation] = useMutation(UPDATE_CARD_NAME, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const [deleteCardMutation] = useMutation(DELETE_CARD, {
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

  const newCardName = (updateObject: any) => {
    try {
      // @ts-ignore
      const obj = { ...updateObject, idBoard: board._id };
      updateCardNameMutation({
        variables: { updateCardNameInput: obj },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCard = (cardId: string) => {
    if (board === null) {
      console.log(
        "Board is null!  Don't worry, this will never actually happen.",
      );
      return;
    }
    try {
      const deleteObject = {
        _id: cardId,
        idBoard: board._id,
      };
      deleteCardMutation({ variables: { deleteCardInput: deleteObject } });
    } catch (e) {
      console.log(e);
    }
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
