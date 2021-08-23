import { useState, useEffect, ReactNode } from 'react';
import { ALL_LISTS, GET_BOARD } from '../graphql/queries/getAllLists';
import { useQuery, useMutation } from '@apollo/client';
import { BoardInterface, CardData, ListData, ListInterface } from '../types';
import { DropResult } from 'react-beautiful-dnd';
import { BoardContext } from '../hooks/useBoardContext';
import {
  reorderCardsAcrossLists,
  reorderCardsInSameList,
  reorderLists,
} from '../utlities/onDragEndHelpers';
import {
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
} from '../graphql/mutations/all';
import {
  newItemPosition,
  updateItemPosition,
  updateItemPositionAcross,
} from '../utlities/calculatePositionHelpers';
import BOARD_SUBSCRIPTION from '../graphql/subscriptions/all';
import { useParams } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const BoardProvider = ({ children }: Props) => {
  // @ts-ignore comment
  let { boardId } = useParams();

  //perhaps change the fetch policy, but you would need to sort the cache by pos.
  //Benefit here would be that you can remove the onDragEndHelpers
  const { loading, error, data, refetch } = useQuery(GET_BOARD, {
    variables: { id: boardId },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'standby',
  });
  // const { loading, error, data, subscribeToMore } = useQuery(GET_BOARD, {
  //   variables: { _id: boardId },
  // });
  // subscribeToMore({
  //   document: BOARD_SUBSCRIPTION,
  //   updateQuery: (prev, { subscriptionData }) => {
  //     if (!subscriptionData.data) return prev;
  //     const newBoard = subscriptionData.data.newBoard;
  //     console.log('hi', newBoard);
  //     console.log(prev);

  //     return Object.assign({}, prev, {
  //       allLists: {
  //         newBoard,
  //       },
  //     });
  //   },
  // });

  const [board, setBoard] = useState<BoardInterface | null>(null);

  const [newListMutation] = useMutation(CREATE_LIST, {
    // refetchQueries: [{ query: GET_BOARD, variables: { id: boardId } }],
  });

  const [updateListMutation] = useMutation(UPDATE_LIST);

  const [deleteListMutation] = useMutation(DELETE_LIST, {
    // refetchQueries: [{ query: GET_BOARD, variables: { id: boardId } }],
  });

  const [newCardMutation] = useMutation(CREATE_CARD, {
    // refetchQueries: [{ query: GET_BOARD, variables: { id: boardId } }],
  });

  const [updateCardMutation] = useMutation(UPDATE_CARD);

  const [deleteCardMutation] = useMutation(DELETE_CARD, {
    // refetchQueries: [{ query: GET_BOARD, variables: { id: boardId } }],
  });

  useEffect(() => {
    if (data) {
      console.log(data);

      setBoard(data.getBoardById);
    }
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    if (board === null) {
      console.log(
        "Board is null!  Don't worry, this will never actuall happen.",
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
      };

      updateListMutation({
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
      };

      updateCardMutation({
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
    console.log(newPos);

    const updateCardObject = {
      // @ts-ignore comment
      _id: sourceList.cards[source.index]._id,
      pos: newPos,
      idList: destination.droppableId,
    };

    updateCardMutation({
      variables: { updateCardPosInput: updateCardObject },
    });
  };

  const addList = (input: string) => {
    if (board === null) {
      console.log(
        "Board is null!  Don't worry, this will never actuall happen.",
      );
      return;
    }
    try {
      const listObject: ListData = {
        name: input,
        pos: newItemPosition(board.lists),
        idBoard: board._id,
      };
      newListMutation({ variables: { createListInput: listObject } });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteList = (idList: string) => {
    try {
      deleteListMutation({ variables: { deleteListId: idList } });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const addCard = (input: string, list: ListInterface) => {
    try {
      const cardObject: CardData = {
        name: input,
        pos: newItemPosition(list.cards),
        idList: list._id,
      };
      newCardMutation({ variables: { createCardInput: cardObject } });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCard = (cardId: string) => {
    try {
      deleteCardMutation({ variables: { deleteCardId: cardId } });
      refetch();
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
        addList,
        deleteList,
        addCard,
        deleteCard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
