import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ListList from './ListList';
import CreateForm from '../../components/CreateForm';
import useBoardContext from '../../hooks/useBoardContext';
import { CREATE_LIST } from '../../graphql/mutations/all';
import { ListData } from '../../types';
import { useMutation } from '@apollo/client';

const Wrapper = styled.div`
  display: flex;
`;

const Board = () => {
  const { loading, error, board, onDragEnd, addList } = useBoardContext();

  const [newListMutation] = useMutation(CREATE_LIST);

  const handleCreateList = (input: string) => {
    try {
      const listObject: ListData = {
        title: input,
        index: board.length,
      };
      newListMutation({ variables: { createListInput: listObject } });
      //gonna need the new list mutation data to create newList id
      addList(listObject);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading || !board.length) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
            <ListList lists={board} />
            {provided.placeholder}
            <CreateForm buttonText="List" submitData={handleCreateList} />
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
