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
import {
  addCardState,
  addListState,
  deleteListState,
  deleteCardState,
} from '../utlities/createUpdateHelpers';

interface Props {
  children: ReactNode;
}

const BoardProvider = ({ children }: Props) => {
  const { loading, error, data } = useQuery(ALL_LISTS);
  const [board, setBoard] = useState<ListInterface[]>([]);

  const [newListMutation] = useMutation(CREATE_LIST);
  const [deleteListMutation] = useMutation(DELETE_LIST);
  const [newCardMutation] = useMutation(CREATE_CARD);
  const [deleteCardMutation] = useMutation(DELETE_CARD);

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
        pos: board.length,
      };
      newListMutation({ variables: { createListInput: listObject } });
      //gonna need the new list mutation data to create newList id
      addListState(listObject, board, setBoard);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteList = (idList: string) => {
    try {
      deleteListMutation({ variables: { deleteListId: idList } });
      deleteListState(idList, board, setBoard);
    } catch (e) {
      console.log(e);
    }
  };

  const addCard = (input: string, list: ListInterface) => {
    try {
      const cardObject: CardData = {
        name: input,
        pos: list.cards.length,
        idList: list._id,
      };
      newCardMutation({ variables: { createCardInput: cardObject } });
      //gonna need the new card mutation data to create newCard id
      addCardState(cardObject, board, setBoard);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCard = (idList: string, cardId: string) => {
    try {
      deleteCardMutation({ variables: { deleteCardId: cardId } });
      deleteCardState(idList, cardId, board, setBoard);
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
