import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ListList from './ListList';
import CreateListBoardForm from '../../components/CreateListBoardForm';
import useBoardContext from '../../hooks/useBoardContext';

const Wrapper = styled.div`
  display: flex;
`;

const Board = () => {
  const { loading, error, board, onDragEnd, addList } = useBoardContext();

  if (loading || board === null) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h1>{board.name}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
              <ListList lists={board.lists} />
              {provided.placeholder}
              <CreateListBoardForm buttonText="List" submitData={addList} />
            </Wrapper>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
