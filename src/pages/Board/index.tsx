import { useState, useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ColumnList from './ColumnList';
import { useForm } from 'react-hook-form';
import ALL_LISTS from '../../graphql/queries/getAllLists';
import { useQuery } from '@apollo/client';
import { ColumnInterface } from '../../board-data';

export type FormData = {
  title: string;
  content: string;
};

const Wrapper = styled.div`
  display: flex;
`;

const Board = () => {
  const { loading, error, data } = useQuery(ALL_LISTS);
  const [board, setBoard] = useState<ColumnInterface[]>([]);
  console.log(data);

  useEffect(() => {
    if (data) {
      setBoard(data.allLists);
      console.log(data.allLists);
      console.log(data);
      console.log(board);
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

    //reorder columns
    if (type === 'column') {
      const newBoard = [...board];
      const splicedColumn = newBoard.splice(source.index, 1)[0];
      newBoard.splice(destination.index, 0, splicedColumn);

      setBoard(newBoard);
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    //if a task is moved within the same column, reorder tasks
    if (start === finish) {
      const column = board.find((col) => col.id === start);
      // @ts-ignore comment
      const newTaskArray = [...column.tasks];
      const splicedTask = newTaskArray.splice(source.index, 1)[0];
      newTaskArray.splice(destination.index, 0, splicedTask);

      const newColumn = {
        ...column,
        tasks: newTaskArray,
      };

      const newBoard = board.map((col) => (col.id === start ? newColumn : col));
      // @ts-ignore comment
      setBoard(newBoard);
      return;
    }

    //if a task is moved between columns
    const startColumn = board.find((col) => col.id === start);
    // @ts-ignore comment
    const newStartTaskArray = [...startColumn.tasks];
    const splicedTask = newStartTaskArray.splice(source.index, 1)[0];

    const newStartColumn = {
      ...startColumn,
      tasks: newStartTaskArray,
    };

    const finishColumn = board.find((col) => col.id === finish);
    // @ts-ignore comment
    const newFinishTaskArray = [...finishColumn.tasks];
    newFinishTaskArray.splice(destination.index, 0, splicedTask);

    const newFinishColumn = {
      ...finishColumn,
      tasks: newFinishTaskArray,
    };

    const newBoard = board.map((col) => {
      if (col.id === start) {
        return newStartColumn;
      } else if (col.id === finish) {
        return newFinishColumn;
      } else {
        return col;
      }
    });
    // @ts-ignore comment
    setBoard(newBoard);
  };

  const addColumn = (data: FormData) => {
    console.log(data);

    const column = {
      id: `${Math.random()}`,
      title: data.title,
      tasks: [],
    };
    const newBoard = [...board, column];
    setBoard(newBoard);
  };

  const deleteColumn = (columnId: string) => {
    const newBoard = board.filter((x) => x.id !== columnId);
    setBoard(newBoard);
  };

  const newTask = (columnId: string, data: FormData) => {
    const task = {
      id: `${Math.random()}`,
      content: data.content,
    };

    // @ts-ignore comment
    const taskList = board.find((x) => x.id === columnId).tasks;
    const newTaskList = [...taskList, task];

    const newBoard = board.map((x) =>
      x.id === columnId ? { ...x, tasks: newTaskList } : x,
    );
    setBoard(newBoard);
  };

  const deleteTask = (columnId: string, taskId: string) => {
    // @ts-ignore comment
    const taskList = board.find((x) => x.id === columnId).tasks;
    const newTaskList = taskList.filter((x) => x.id !== taskId);

    const newBoard = board.map((x) =>
      x.id === columnId ? { ...x, tasks: newTaskList } : x,
    );
    setBoard(newBoard);
  };

  const onSubmit = handleSubmit((data) => addColumn(data));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
            <ColumnList
              columns={board}
              deleteColumn={deleteColumn}
              newTask={newTask}
              deleteTask={deleteTask}
            />
            {provided.placeholder}
            <form onSubmit={onSubmit}>
              <input type="text" {...register('title', { required: true })} />
              <button type="submit">Add Column</button>
            </form>
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
