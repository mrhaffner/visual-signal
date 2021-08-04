import { useState, useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ListList from './ListList';
import { useForm } from 'react-hook-form';
import ALL_LISTS from '../../graphql/queries/getAllLists';
import { useQuery } from '@apollo/client';
import { ListInterface } from '../../types';

export type FormData = {
  title: string;
  content: string;
  index: number;
};

const Wrapper = styled.div`
  display: flex;
`;

const Board = () => {
  const { loading, error, data } = useQuery(ALL_LISTS);
  const [board, setBoard] = useState<ListInterface[]>([]);
  console.log(data);

  useEffect(() => {
    if (data) {
      setBoard(data.allLists);
    }
  }, [data]);

  const { register, handleSubmit } = useForm<FormData>();

  if (loading || !board.length) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  //make this into a hook/hooks?
  let onDragEnd = (result: DropResult) => {
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

  const addList = (data: FormData) => {
    const list = {
      _id: `${Math.random()}`,
      title: data.title,
      index: data.index,
      cards: [],
    };
    const newBoard = [...board, list];
    setBoard(newBoard);
  };

  const deleteList = (listId: string) => {
    const newBoard = board.filter((x) => x._id !== listId);
    setBoard(newBoard);
  };

  const newCard = (listId: string, data: FormData) => {
    const card = {
      _id: `${Math.random()}`,
      content: data.content,
      index: data.index,
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

  const onSubmit = handleSubmit((data) => addList(data));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
            <ListList
              lists={board}
              deleteList={deleteList}
              newCard={newCard}
              deleteCard={deleteCard}
            />
            {provided.placeholder}
            <form onSubmit={onSubmit}>
              <input type="text" {...register('title', { required: true })} />
              <button type="submit">Add List</button>
            </form>
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
