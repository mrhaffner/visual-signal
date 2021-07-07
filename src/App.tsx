import React from 'react';
import { useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './components/Column'
import initialData, { ColumnInterface, ColumnsInterface, TasksInterface } from './initial-data';

interface InnerListProps {
  column: ColumnInterface
  taskMap: TasksInterface
  index: number
}

const InnerList = React.memo(({ column, taskMap, index }: InnerListProps) => {
  //make this generic or use a type guard???
  const tasks = column.taskIds.map(taskId => taskMap[taskId as keyof TasksInterface]);

  return (
    <Column column={column} tasks={tasks} index={index}/>
  )
})

function App() {
  const [state, setState] = useState(initialData)

  let onDragEnd = (result: DropResult) => {
    const { destination, draggableId, source, type } = result;
  
    if (!destination) return;
  
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
  
    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
    
      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return
    }

    //make these generic or use a typeguard?????
    const start = state.columns[source.droppableId as keyof ColumnsInterface];
    const finish = state.columns[destination.droppableId as keyof ColumnsInterface];

    if (start === finish) {
      const column = state.columns[source.droppableId as keyof ColumnsInterface];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
    
      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };
    
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
    
      setState(newState);
      return
    }

    //if moving to a new column
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  };

  const Container = styled.div`
    display: flex;
  `;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {
              state.columnOrder.map((columnId, index) => {
                //make this generic or use a type guard????
                const column = state.columns[columnId as keyof ColumnsInterface];
          
                return <InnerList key={column.id} column={column} taskMap={state.tasks} index={index}/>;
              })
            }
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default App;
