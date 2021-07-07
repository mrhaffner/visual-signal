import styled from 'styled-components'
import Task from './Task'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ColumnInterface, TaskInterface } from '../initial-data'

const Container = styled.div`
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
  isDraggingOver: boolean
}

const TaskList = styled.div<BoardItemStylesProps>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

interface Props {
  column: ColumnInterface
  index: number
  tasks: TaskInterface[]
}

function Column({ column, index, tasks }: Props) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>
            {column.title}
          </Title>
          <Droppable droppableId={column.id} type='task'>
            {(provided, snapshot) => (
              <TaskList 
                ref={provided.innerRef} 
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, index)=> <Task key={task.id} task={task} index={index}/>)}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>

  )
}

export default Column