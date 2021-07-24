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

  let onDragEnd = (result: DropResult) => {
    // const { destination, draggableId, source, type } = result;
    // if (!destination) return;
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   return;
    // }
    // //reorder columns
    // if (type === 'column') {
    //   const newColumnOrder = Array.from(state.columnOrder);
    //   newColumnOrder.splice(source.index, 1);
    //   newColumnOrder.splice(destination.index, 0, draggableId);
    //   const newState = {
    //     ...state,
    //     columnOrder: newColumnOrder,
    //   };
    //   setState(newState);
    //   return;
    // }
    // //make these generic or use a typeguard?????
    // const start = state.columns[source.droppableId as keyof ColumnsInterface];
    // const finish =
    //   state.columns[destination.droppableId as keyof ColumnsInterface];
    // //if moving within the same column
    // if (start === finish) {
    //   const column =
    //     state.columns[source.droppableId as keyof ColumnsInterface];
    //   const newTaskIds = Array.from(column.taskIds);
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);
    //   const newColumn = {
    //     ...column,
    //     taskIds: newTaskIds,
    //   };
    //   const newState = {
    //     ...state,
    //     columns: {
    //       ...state.columns,
    //       [newColumn.id]: newColumn,
    //     },
    //   };
    //   setState(newState);
    //   return;
    // }
    // //if moving to a new column
    // const startTaskIds = Array.from(start.taskIds);
    // startTaskIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   taskIds: startTaskIds,
    // };
    // const finishTaskIds = Array.from(finish.taskIds);
    // finishTaskIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   taskIds: finishTaskIds,
    // };
    // const newState = {
    //   ...state,
    //   columns: {
    //     ...state.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish,
    //   },
    // };
    // setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
            <ColumnList columns={state} />
            {/* placeholder? */}
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
