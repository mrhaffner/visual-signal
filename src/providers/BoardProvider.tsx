import { useState, useEffect, ReactNode } from 'react';
import { GET_BOARD } from '../graphql/queries/all';
import { useQuery, useMutation } from '@apollo/client';
import { BoardInterface, ListInterface } from '../types';
import { DropResult } from 'react-beautiful-dnd';
import { BoardContext } from '../hooks/useBoardContext';
import {
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
import {
  BOARD_UPDATE_SUBSCRIPTION,
  BOARD_DELETED_SUBSCRIPTION,
} from '../graphql/subscriptions/all';
import { useParams, useHistory } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const BoardProvider = ({ children }: Props) => {
  // @ts-ignore comment
  let { boardId } = useParams();
  const history = useHistory();
  const { loading, error, data, subscribeToMore } = useQuery(GET_BOARD, {
    variables: { id: boardId },
  });

  const [board, setBoard] = useState<BoardInterface | null>(null);

  useEffect(() => {
    if (data && data.getBoardById[0]) {
      setBoard(data.getBoardById[0]); //!!!
    } else if (data) {
      history.push('/boards');
    }
  }, [data]);

  subscribeToMore({
    document: BOARD_UPDATE_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.boardUpdated) return prev;
      const updatedBoard = subscriptionData.data.boardUpdated;

      if (boardId !== updatedBoard._id) return prev;

      return Object.assign({}, prev, {
        getBoardById: updatedBoard, //?
      });
    },
  });

  subscribeToMore({
    document: BOARD_DELETED_SUBSCRIPTION,
    variables: { idBoards: [boardId] },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.boardDeleted) return prev;
      return Object.assign({}, prev, {
        getBoardById: [],
      });
    },
  });

  const [updateBoardNameMutation] = useMutation(UPDATE_BOARD_NAME);

  const [deleteBoardMutation] = useMutation(DELETE_BOARD);

  const [newListMutation] = useMutation(CREATE_LIST);

  const [updateListPosMutation] = useMutation(UPDATE_LIST_POS);

  const [updateListNameMutation] = useMutation(UPDATE_LIST_NAME);

  const [deleteListMutation] = useMutation(DELETE_LIST);

  const [newCardMutation] = useMutation(CREATE_CARD);

  const [updateCardPosMutation] = useMutation(UPDATE_CARD_POS);

  const [updateCardNameMutation] = useMutation(UPDATE_CARD_NAME);

  const [deleteCardMutation] = useMutation(DELETE_CARD);

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
      reorderLists(board, source, destination, setBoard);

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

  const newBoardName = (input: string) => {
    if (board === null) {
      console.log(
        "Board is null!  Don't worry, this will never actually happen.",
      );
      return;
    }
    try {
      const updateObject = {
        _id: board._id,
        name: input,
      };
      updateBoardNameMutation({
        variables: { updateBoardInput: updateObject },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteBoard = (id: string) => {
    deleteBoardMutation({
      variables: { boardId: id },
    });
  };

  const addList = (input: string) => {
    if (board === null) {
      console.log(
        "Board is null!  Don't worry, this will never actually happen.",
      );
      return;
    }
    try {
      const listObject = {
        name: input,
        pos: newItemPosition(board.lists),
        idBoard: board._id,
      };
      newListMutation({ variables: { createListInput: listObject } });
    } catch (e) {
      console.log(e);
    }
  };

  const newListName = (updateObject: any) => {
    try {
      // @ts-ignore
      const obj = { ...updateObject, idBoard: board._id };

      updateListNameMutation({
        variables: { updateListNameInput: obj },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteList = (idList: string) => {
    if (board === null) {
      console.log(
        "Board is null!  Don't worry, this will never actually happen.",
      );
      return;
    }
    try {
      const deleteObject = {
        _id: idList,
        idBoard: board._id,
      };
      deleteListMutation({ variables: { deleteListInput: deleteObject } });
    } catch (e) {
      console.log(e);
    }
  };

  const addCard = (input: string, list: ListInterface) => {
    if (board === null) {
      console.log(
        "Board is null!  Don't worry, this will never actually happen.",
      );
      return;
    }
    try {
      const cardObject = {
        name: input,
        pos: newItemPosition(list.cards),
        idList: list._id,
        idBoard: board._id,
      };
      newCardMutation({ variables: { createCardInput: cardObject } });
    } catch (e) {
      console.log(e);
    }
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
