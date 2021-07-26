import TaskList from './TaskList';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ColumnInterface } from '../../board-data';
import { FormData } from './index';
import { useForm } from 'react-hook-form';

const Wrapper = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

type BoardItemStylesProps = {
  isDraggingOver: boolean;
};

const List = styled.div<BoardItemStylesProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

interface Props {
  column: ColumnInterface;
  index: number;
  deleteColumn: (columnId: string) => void;
  newTask: (columnId: string, data: FormData) => void;
  deleteTask: (columnId: string, taskId: string) => void;
}

const Column = ({
  column,
  index,
  deleteColumn,
  newTask,
  deleteTask,
}: Props) => {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => newTask(column.id, data));

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Wrapper {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <button onClick={() => deleteColumn(column.id)}>Delete Me</button>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <List
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <TaskList
                  tasks={column.tasks}
                  deleteTask={deleteTask}
                  columnId={column.id}
                />
                {provided.placeholder}
              </List>
            )}
          </Droppable>
          <form onSubmit={onSubmit}>
            <input type="text" {...register('content', { required: true })} />
            <button type="submit">Add Task</button>
          </form>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Column;
