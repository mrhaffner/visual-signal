import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ListList from './ListList';
import useBoardContext from '../../hooks/useBoardContext';
import OpenListComposer from '../../components/Composers/OpenListComposer';
import { useEffect, useState } from 'react';
import ListComposer from '../../components/Composers/ListComposer';
import BoardHeader from './BoardHeader';
import NavBar from '../../components/NavBar';
import MemberMenuPopover from '../../components/Popovers/MemberMenuPopover';
import useMemberContext from '../../hooks/useMemberContext';
import useToggle from '../../hooks/useToggle';
import ProfilePopover from '../../components/Popovers/ProfilePopover';
import { MemberInfo } from '../../types';
import InvitePopover from '../../components/Popovers/InvitePopover';
import { useHistory } from 'react-router';

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
  let history = useHistory();
  const [showComposer, setShowComposer] = useState(false);
  const [showMenuPopover, toggleMenuPopover] = useToggle();
  const [showInvitePopover, toggleInvitePopover] = useToggle();
  const [popoverMember, setPopoverMember] = useState<MemberInfo | null>(null);
  const [inviteBtnPosition, setInviteBtnPosition] = useState(0);
  const [facePilePosition, setFacePilePosition] = useState(0);

  useEffect(() => {
    if (board) {
      if (memberLevel.length === 0) {
        history.push('/boards');
      }
    }
  });

  if (loading || board === null) return <></>;
  if (error) return <p>Error :(</p>;

  const memberLevel = board.members.filter(
    (x: MemberInfo) => x.idMember === member._id,
  );

  const adminCount = board.members.filter(
    (x: MemberInfo) => x.memberType !== 'normal',
  ).length;

  return (
    <>
      <NavBar
        setBlue={false}
        isLoading={loading}
        toggleMenuPopover={toggleMenuPopover}
      />
      <BoardHeader
        setInviteBtnPosition={setInviteBtnPosition}
        handleDelete={deleteBoard}
        submitData={newBoardName}
        board={board}
        setPopoverMember={setPopoverMember}
        toggleInvitePopover={toggleInvitePopover}
        setFacePilePosition={setFacePilePosition}
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
          facePilePosition={facePilePosition}
          member={popoverMember}
          setPopoverMember={setPopoverMember}
          memberCount={board.members.length}
          adminCount={adminCount}
          myId={member._id}
          myMemberLevel={memberLevel[0].memberType}
          boardId={board._id}
        />
      )}
      {showInvitePopover && (
        <InvitePopover
          inviteBtnPosition={inviteBtnPosition}
          toggleInvitePopover={toggleInvitePopover}
          boardId={board._id}
        />
      )}
    </>
  );
};

export default Board;
