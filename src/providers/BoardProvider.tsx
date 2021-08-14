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
  DELETE_LIST,
  CREATE_CARD,
  DELETE_CARD,
} from '../graphql/mutations/all';
import { newItemPosition } from '../utlities/calculatePositionHelpers';

interface Props {
  children: ReactNode;
}

const BoardProvider = ({ children }: Props) => {
  const { loading, error, data } = useQuery(ALL_LISTS);
  const [board, setBoard] = useState<ListInterface[]>([]);

  const [newListMutation] = useMutation(CREATE_LIST, {
    refetchQueries: [{ query: ALL_LISTS }],
  });
  const [deleteListMutation] = useMutation(DELETE_LIST, {
    refetchQueries: [{ query: ALL_LISTS }],
  });
  const [newCardMutation] = useMutation(CREATE_CARD, {
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

    if (type === 'list') {
      reorderLists(board, source, destination, setBoard);
      return;
    }

    if (source.droppableId === destination.droppableId) {
      reorderCardsInSameList(board, source, destination, setBoard);
      return;
    }

    reorderCardsAcrossLists(board, source, destination, setBoard);
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
