import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ListList from './ListList';
import useBoardContext from '../../hooks/useBoardContext';
import OpenListComposer from '../../components/OpenListComposer';
import { useState } from 'react';
import ListComposer from '../../components/ListComposer';
import BoardHeader from './BoardHeader';
import NavBar from '../../components/NavBar';
import MemberMenuPopover from '../../components/Popovers/MemberMenuPopover';
import useMemberContext from '../../hooks/useMemberContext';
import useToggle from '../../hooks/useToggle';
import ProfilePopover from '../../components/Popovers/ProfilePopover';
import { MemberInfo } from '../../types';
import InvitePopover from '../../components/Popovers/InvitePopover';

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
  const [showInvitePopover, toggleInvitePopover] = useToggle();
  const [popoverMember, setPopoverMember] = useState<MemberInfo | null>(null);

  if (loading || board === null) return <></>;
  if (error) return <p>Error :(</p>;

  const adminCount = board.members.filter(
    (x: MemberInfo) => x.memberType !== 'normal',
  ).length;

  const myMemberLevel = board.members.filter(
    (x: MemberInfo) => x.idMember === member._id,
  )[0].memberType;

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
        setPopoverMember={setPopoverMember}
        toggleInvitePopover={toggleInvitePopover}
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
        showPopover={showMenuPopover}
        togglePopover={toggleMenuPopover}
        initials={member.initials}
        name={member.fullName}
        email={member.email}
      />
      {popoverMember && (
        <ProfilePopover
          member={popoverMember}
          setPopoverMember={setPopoverMember}
          memberCount={board.members.length}
          adminCount={adminCount}
          myId={member._id}
          myMemberLevel={myMemberLevel}
        />
      )}
      {showInvitePopover && (
        <InvitePopover toggleInvitePopover={toggleInvitePopover} />
      )}
    </>
  );
};

export default Board;
