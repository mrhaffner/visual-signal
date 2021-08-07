import { useState, useEffect } from 'react';
import ALL_LISTS from '../graphql/queries/getAllLists';
import { useQuery } from '@apollo/client';
import { ListInterface } from '../types';
import { OutputData } from '../components/CreateForm';
import { DropResult } from 'react-beautiful-dnd';

const useBoard = () => {
  const { loading, error, data } = useQuery(ALL_LISTS);
  const [board, setBoard] = useState<ListInterface[]>([]);
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

    //reorder Lists
    if (type === 'list') {
      const newBoard = [...board];
      const splicedList = newBoard.splice(source.index, 1)[0];
      newBoard.splice(destination.index, 0, splicedList);

      setBoard(newBoard);
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    //if a Card is moved within the same List, reorder Cards
    if (start === finish) {
      const list = board.find((x) => x._id === start);
      // @ts-ignore comment
      const newCardArray = [...list.cards];
      const splicedCard = newCardArray.splice(source.index, 1)[0];
      newCardArray.splice(destination.index, 0, splicedCard);

      const newList = {
        ...list,
        cards: newCardArray,
      };

      const newBoard = board.map((x) => (x._id === start ? newList : x));
      // @ts-ignore comment
      setBoard(newBoard);
      return;
    }

    //if a Card is moved between Lists
    const startList = board.find((x) => x._id === start);
    // @ts-ignore comment
    const newStartCardArray = [...startList.cards];
    const splicedCard = newStartCardArray.splice(source.index, 1)[0];

    const newStartList = {
      ...startList,
      cards: newStartCardArray,
    };

    const finishList = board.find((x) => x._id === finish);
    // @ts-ignore comment
    const newFinishCardArray = [...finishList.cards];
    newFinishCardArray.splice(destination.index, 0, splicedCard);

    const newFinishList = {
      ...finishList,
      cards: newFinishCardArray,
    };

    const newBoard = board.map((x) => {
      if (x._id === start) {
        return newStartList;
      } else if (x._id === finish) {
        return newFinishList;
      } else {
        return x;
      }
    });
    // @ts-ignore comment
    setBoard(newBoard);
  };

  const addList = ({ input, index }: OutputData) => {
    const list = {
      _id: `${Math.random()}`,
      title: input,
      index,
      cards: [],
    };
    const newBoard = [...board, list];
    setBoard(newBoard);
  };

  const deleteList = (listId: string) => {
    const newBoard = board.filter((x) => x._id !== listId);
    setBoard(newBoard);
  };

  const newCard = ({ input, index, listId }: OutputData) => {
    const card = {
      _id: `${Math.random()}`,
      content: input,
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

  return {
    loading,
    error,
    board,
    onDragEnd,
    addList,
    deleteList,
    newCard,
    deleteCard,
  };
};

export default useBoard;
