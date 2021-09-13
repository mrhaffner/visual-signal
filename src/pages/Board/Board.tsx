import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ListList from './ListList';
import useBoardContext from '../../hooks/useBoardContext';
import OpenListComposer from '../../components/OpenListComposer';
import { useState } from 'react';
import ListComposer from '../../components/ListComposer';
import BoardHeader from './BoardHeader';
import NavBar from '../../components/NavBar';
import MemberMenuPopover from '../../components/MemberMenuPopover';
import useMemberContext from '../../hooks/useMemberContext';
import useToggle from '../../hooks/useToggle';

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

  const { member, logOut } = useMemberContext();

  const [showComposer, setShowComposer] = useState(false);
  const [showMenuPopover, toggleMenuPopover] = useToggle();

  if (loading || board === null) return <></>;
  if (error) return <p>Error :(</p>;
  console.log(board);

  return (
    <>
      <NavBar
        setBlue={false}
        isLoading={loading}
        toggleMenuPopover={toggleMenuPopover}
      />
      <BoardHeader
        handleDelete={deleteBoard}
        submitData={newBoardName}
        board={board}
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
      <MemberMenuPopover
        logOut={logOut}
        showModal={showMenuPopover}
        toggleModal={toggleMenuPopover}
        initials={member.initials}
        name={member.fullName}
        email={member.email}
      />
    </>
  );
};

export default Board;
