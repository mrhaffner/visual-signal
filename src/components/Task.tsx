import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { TaskInterface } from '../initial-data';

type BoardItemStylesProps = {
    isDragging: boolean
}

const Container = styled.div<BoardItemStylesProps>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

interface Props {
    task: TaskInterface
    index: number
}

function Task( { task, index }: Props) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    {task.content}
                </Container>
            )}
        </Draggable>
    )
}

export default Task