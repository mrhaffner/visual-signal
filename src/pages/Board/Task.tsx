import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { TaskInterface } from '../../board-data';

type BoardItemStylesProps = {
  isDragging: boolean;
};

const Wrapper = styled.div<BoardItemStylesProps>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

interface Props {
  task: TaskInterface;
  index: number;
}

const Task = ({ task, index }: Props) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <Wrapper
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        <div>{task.content}</div>
      </Wrapper>
    )}
  </Draggable>
);

export default Task;
