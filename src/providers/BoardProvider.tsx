import { useState, useEffect, ReactNode } from 'react';
import ALL_LISTS from '../graphql/queries/getAllLists';
import { useQuery, useMutation } from '@apollo/client';
import { CardData, ListData, ListInterface } from '../types';
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

interface Props {
  children: ReactNode;
}

const BoardProvider = ({ children }: Props) => {
  const { loading, error, data } = useQuery(ALL_LISTS);
  const [board, setBoard] = useState<ListInterface[]>([]);

  const [newListMutation] = useMutation(CREATE_LIST, {
    refetchQueries: [{ query: ALL_LISTS }],
  });

  const [updateListMutation] = useMutation(UPDATE_LIST, {
    refetchQueries: [{ query: ALL_LISTS }],
  });

  const [deleteListMutation] = useMutation(DELETE_LIST, {
    refetchQueries: [{ query: ALL_LISTS }],
  });

  const [newCardMutation] = useMutation(CREATE_CARD, {
    refetchQueries: [{ query: ALL_LISTS }],
  });

  const [updateCardMutation] = useMutation(UPDATE_CARD, {
    refetchQueries: [{ query: ALL_LISTS }],
  });

  const [deleteCardMutation] = useMutation(DELETE_CARD, {
    refetchQueries: [{ query: ALL_LISTS }],
  });

  console.log(board);

  useEffect(() => {
    if (data) {
      setBoard(data.allLists);
    }
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // if (type === 'list') {
    //   reorderLists(board, source, destination, setBoard);
    //   return;
    // }

    if (type === 'list') {
      const newPos = updateItemPosition(board, destination.index, source.index);
      const updateListObject = {
        _id: board[source.index]._id,
        pos: newPos,
      };

      updateListMutation({
        variables: { updateListPosInput: updateListObject },
      });
      return;
    }

    // if (source.droppableId === destination.droppableId) {
    //   reorderCardsInSameList(board, source, destination, setBoard);
    //   return;
    // }

    if (source.droppableId === destination.droppableId) {
      const list = board.find((x) => x._id === source.droppableId);
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
      console.log(updateCardObject);

      updateCardMutation({
        variables: { updateCardPosInput: updateCardObject },
      });
      return;
    }

    // reorderCardsAcrossLists(board, source, destination, setBoard);
    const sourceList = board.find((x) => x._id === source.droppableId);
    const destinationList = board.find(
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
    console.log(updateCardObject);

    updateCardMutation({
      variables: { updateCardPosInput: updateCardObject },
    });
  };

  const addList = (input: string) => {
    try {
      const listObject: ListData = {
        name: input,
        pos: newItemPosition(board),
      };
      newListMutation({ variables: { createListInput: listObject } });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteList = (idList: string) => {
    try {
      deleteListMutation({ variables: { deleteListId: idList } });
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
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCard = (cardId: string) => {
    try {
      deleteCardMutation({ variables: { deleteCardId: cardId } });
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
