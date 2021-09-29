import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ListList from '../ListList';
import useBoardContext from '../../../hooks/useBoardContext';
import OpenListComposer from '../../../components/Composers/OpenListComposer';
import { useEffect, useState } from 'react';
import ListComposer from '../../../components/Composers/ListComposer';
import BoardHeader from '../BoardHeader/BoardHeader';
import useMemberContext from '../../../hooks/useMemberContext';
import useToggle from '../../../hooks/useToggle';
import ProfilePopover from '../../../components/Popovers/ProfilePopover';
import { ColorKeys, MemberInfo } from '../../../types';
import InvitePopover from '../../../components/Popovers/InvitePopover';
import { useHistory } from 'react-router';
import PageNotFound from '../../PageNotFound';
import { Wrapper } from './style';

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

  if (loading || !board) return <></>;

  if (board === null) return <PageNotFound />;

  if (error) return <p>Error :(</p>;

  const adminList = board.members.filter(
    (x: MemberInfo) => x.memberType !== 'normal',
  );

  const adminCount = adminList.length;

  const amAdmin = !!adminList.filter(
    (x: MemberInfo) => x.idMember === member._id,
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
        amAdmin={amAdmin}
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
