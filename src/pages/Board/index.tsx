import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ListList from './ListList';
import useBoardContext from '../../hooks/useBoardContext';
import OpenListComposer from '../../components/OpenListComposer';
import { useState, useEffect } from 'react';
import ListComposer from '../../components/ListComposer';
import BoardHeader from './BoardHeader';
import useLoadingContext from '../../hooks/useLoadingContext';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 4px;
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
  const { setIsLoading } = useLoadingContext();

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading, setIsLoading]);

  const [showComposer, setShowComposer] = useState(false);

  let history = useHistory();

  const goToBoards = () => {
    history.push('/boards');
  };

  if (loading || board === null) return <></>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <BoardHeader
        handleDelete={deleteBoard}
        goToBoards={goToBoards}
        text={board.name}
        submitData={newBoardName}
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
