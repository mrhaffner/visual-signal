import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ListList from './ListList';
import useBoardContext from '../../hooks/useBoardContext';
import EditableTextInput from '../../components/EditableTextInput';
import DeleteBoardButton from '../../components/DeleteBoardButton';
import OpenListComposer from '../../components/OpenListComposer';
import { useState } from 'react';
import ListComposer from '../../components/ListComposer';

const Wrapper = styled.div`
  display: flex;
`;

const Board = () => {
  const {
    loading,
    error,
    board,
    onDragEnd,
    newBoardName,
    deleteBoard,
    addList,
  } = useBoardContext();

  const [showComposer, setShowComposer] = useState(false);

  let history = useHistory();

  const goHome = () => {
    history.push('/');
  };

  if (loading || board === null) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <EditableTextInput
        text={board.name}
        onSetText={(text: string) => newBoardName(text)}
      />
      <DeleteBoardButton
        handleDelete={deleteBoard}
        goHome={goHome}
        id={board._id}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
              <ListList lists={board.lists} />
              {provided.placeholder}
              {showComposer ? (
                <ListComposer
                  setShowComposer={setShowComposer}
                  submitData={addList}
                />
              ) : (
                <OpenListComposer setShowComposer={setShowComposer} />
              )}
            </Wrapper>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
