import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ListList from './ListList';
import CreateForm from '../../components/CreateForm';
import useBoardContext from '../../hooks/useBoardContext';

const Wrapper = styled.div`
  display: flex;
`;

const Board = () => {
  const {
    // @ts-ignore comment
    loading,
    // @ts-ignore comment
    error,
    // @ts-ignore comment
    board,
    // @ts-ignore comment
    onDragEnd,
    // @ts-ignore comment
    addList,
    // @ts-ignore comment
  } = useBoardContext();

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
