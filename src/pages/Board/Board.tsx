import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import ListList from './ListList';
import useBoardContext from '../../hooks/useBoardContext';
import OpenListComposer from '../../components/Composers/OpenListComposer';
import { useEffect, useState } from 'react';
import ListComposer from '../../components/Composers/ListComposer';
import BoardHeader from './BoardHeader';
import useMemberContext from '../../hooks/useMemberContext';
import useToggle from '../../hooks/useToggle';
import ProfilePopover from '../../components/Popovers/ProfilePopover';
import { ColorKeys, MemberInfo } from '../../types';
import InvitePopover from '../../components/Popovers/InvitePopover';
import { useHistory } from 'react-router';
import PageNotFound from '../PageNotFound';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  margin-left: 4px;
  /* max-height: 100%; */
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #00000026;
    border-radius: 4px;
    /* border-right: 13px white solid;
    background-clip: padding-box; */
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

interface Props {
  setBoardColor: (input: ColorKeys) => void;
}

const Board = ({ setBoardColor }: Props) => {
  const {
    loading,
    error,
    board,
    onDragEnd,
    newBoardName,
    deleteBoard,
    addList,
  } = useBoardContext();

  const { member, setMemberFound } = useMemberContext();
  let history = useHistory();
  const [showComposer, setShowComposer] = useState(false);
  const [showInvitePopover, toggleInvitePopover] = useToggle();
  const [popoverMember, setPopoverMember] = useState<MemberInfo | null>(null);
  const [inviteBtnPosition, setInviteBtnPosition] = useState(0);
  const [facePilePosition, setFacePilePosition] = useState(0);

  const memberLevel =
    board?.members.filter((x: MemberInfo) => x.idMember === member._id) || [];

  useEffect(() => {
    if (board) {
      if (memberLevel?.length === 0) {
        history.push('/boards');
      }
    }
  });

  useEffect(() => {
    if (board) {
      setBoardColor(board.color);
    }
  }, [board?.color]);

  useEffect(() => {
    if (error) setMemberFound(false);
  }, [error]);

  if (loading) return <></>;

  if (board === null) return <PageNotFound />;

  if (error) return <p>Error :(</p>;

  const adminCount = board.members.filter(
    (x: MemberInfo) => x.memberType !== 'normal',
  ).length;

  return (
    <>
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
