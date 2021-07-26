import { useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ColumnList from './ColumnList';
import boardData from '../../board-data';

const Wrapper = styled.div`
  display: flex;
`;

const Board = () => {
  const [state, setState] = useState(boardData);

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
      const newState = [...state];
      const splicedColumn = newState.splice(source.index, 1)[0];
      newState.splice(destination.index, 0, splicedColumn);

      setState(newState);
      return;
    }

    const start = source.droppableId;
    const finish = destination.droppableId;

    //if a task is moved within the same column, reorder tasks
    if (start === finish) {
      const column = state.find((col) => col.id === start);
      // @ts-ignore comment
      const newTaskArray = [...column.tasks];
      const splicedTask = newTaskArray.splice(source.index, 1)[0];
      newTaskArray.splice(destination.index, 0, splicedTask);

      const newColumn = {
        ...column,
        tasks: newTaskArray,
      };

      const newState = state.map((col) => (col.id === start ? newColumn : col));
      // @ts-ignore comment
      setState(newState);
      return;
    }

    //if a task is moved between columns
    const startColumn = state.find((col) => col.id === start);
    // @ts-ignore comment
    const newStartTaskArray = [...startColumn.tasks];
    const splicedTask = newStartTaskArray.splice(source.index, 1)[0];

    const newStartColumn = {
      ...startColumn,
      tasks: newStartTaskArray,
    };

    const finishColumn = state.find((col) => col.id === finish);
    // @ts-ignore comment
    const newFinishTaskArray = [...finishColumn.tasks];
    newFinishTaskArray.splice(destination.index, 0, splicedTask);

    const newFinishColumn = {
      ...finishColumn,
      tasks: newFinishTaskArray,
    };

    const newState = state.map((col) => {
      if (col.id === start) {
        return newStartColumn;
      } else if (col.id === finish) {
        return newFinishColumn;
      } else {
        return col;
      }
    });
    // @ts-ignore comment
    setState(newState);
  };

  const newColumn = () => {
    const column = {
      id: `${Math.random()}`,
      title: `${Math.random()}`,
      tasks: [],
    };
    const newState = [...state, column];
    setState(newState);
  };

  const deleteColumn = (columnId: string) => {
    const newState = state.filter((x) => x.id !== columnId);
    setState(newState);
  };

  const newTask = (columnId: string) => {
    const task = {
      id: `${Math.random()}`,
      content: `${Math.random()}`,
    };

    // @ts-ignore comment
    const taskList = state.find((x) => x.id === columnId).tasks;
    const newTaskList = [...taskList, task];

    const newState = state.map((x) =>
      x.id === columnId ? { ...x, tasks: newTaskList } : x,
    );
    setState(newState);
  };

  const deleteTask = (columnId: string, taskId: string) => {
    // @ts-ignore comment
    const taskList = state.find((x) => x.id === columnId).tasks;
    const newTaskList = taskList.filter((x) => x.id !== taskId);

    const newState = state.map((x) =>
      x.id === columnId ? { ...x, tasks: newTaskList } : x,
    );
    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
            <ColumnList
              columns={state}
              deleteColumn={deleteColumn}
              newTask={newTask}
              deleteTask={deleteTask}
            />
            {provided.placeholder}
            <div>
              <button
                onClick={() => {
                  newColumn();
                }}
              >
                Add Column
              </button>
            </div>
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
