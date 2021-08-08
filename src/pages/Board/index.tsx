import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ListList from './ListList';
import CreateForm from '../../components/CreateForm';
import useBoardContext from '../../hooks/useBoardContext';

const Wrapper = styled.div`
  display: flex;
`;

const Board = () => {
  const { loading, error, board, onDragEnd, addList } = useBoardContext();

  if (loading || !board.length) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
            <ListList lists={board} />
            {provided.placeholder}
            <CreateForm
              buttonText="List"
              parentData={{ index: board.length }}
              submitData={addList}
            />
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
