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
import { CREATE_LIST, CREATE_CARD } from '../graphql/mutations/all';
import { addListState } from '../utlities/createUpdateHelpers';

interface Props {
  children: ReactNode;
}

const BoardProvider = ({ children }: Props) => {
  const { loading, error, data } = useQuery(ALL_LISTS);
  const [board, setBoard] = useState<ListInterface[]>([]);

  const [newListMutation] = useMutation(CREATE_LIST);
  const [newCardMutation] = useMutation(CREATE_CARD);

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
        title: input,
        index: board.length,
      };
      newListMutation({ variables: { createListInput: listObject } });
      //gonna need the new list mutation data to create newList id
      addListState(listObject, board, setBoard);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteList = (listId: string) => {
    const newBoard = board.filter((x) => x._id !== listId);
    setBoard(newBoard);
  };

  // const addCard = (input: string) => {
  //   try {
  //     const cardObject: CardData = {
  //       content: input,
  //       index: list.cards.length,
  //       listId: list._id,
  //     };
  //     newCardMutation({ variables: { createCardInput: cardObject } });
  //     //gonna need the new card mutation data to create newCard id
  //     addCard(cardObject);
  //   } catch (e) {
  //     console.log(e);
  //   }

  const addCard = ({ content, index, listId }: CardData) => {
    const card = {
      _id: `${Math.random()}`,
      content,
      index,
    };

    // @ts-ignore comment
    const cardList = board.find((x) => x._id === listId).cards;
    const newCardList = [...cardList, card];

    const newBoard = board.map((x) =>
      x._id === listId ? { ...x, cards: newCardList } : x,
    );
    setBoard(newBoard);
  };

  const deleteCard = (listId: string, cardId: string) => {
    // @ts-ignore comment
    const cardList = board.find((x) => x._id === listId).cards;
    const newCardList = cardList.filter((x) => x._id !== cardId);

    const newBoard = board.map((x) =>
      x._id === listId ? { ...x, cards: newCardList } : x,
    );
    setBoard(newBoard);
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
