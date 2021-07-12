import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { TaskInterface } from '../../initial-data';

import { Card, CardContent, Typography } from '@material-ui/core';

type BoardItemStylesProps = {
  isDragging: boolean;
};

// const Wrapper = styled(Card)<BoardItemStylesProps>`
//   margin-bottom: 8px;
//   background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
// `;

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
        <Typography variant="subtitle2">{task.content}</Typography>
      </Wrapper>
    )}
  </Draggable>
);

export default Task;
