import BoardMenu from '../BoardMenu';
import BoardTitleForm from '../../../components/Inputs/BoardTitleForm';
import { BoardInterface, MemberInfo } from '../../../types';
import { useEffect, useRef } from 'react';
import {
  AdminBadge,
  Avatar,
  Divider,
  FacePile,
  Initials,
  InviteBtn,
  InviteText,
  LeftWrapper,
  Wrapper,
} from './style';

interface Props {
  handleDelete: (id: string) => void;
  board: BoardInterface;
  submitData: (text: string) => void;
  setPopoverMember: (member: MemberInfo | null) => void;
  toggleInvitePopover: () => void;
  setInviteBtnPosition: (input: number) => void;
  setFacePilePosition: (input: number) => void;
  amAdmin: boolean;
}

const BoardHeader = ({
  handleDelete,
  board,
  submitData,
  setPopoverMember,
  toggleInvitePopover,
  setInviteBtnPosition,
  setFacePilePosition,
  amAdmin,
}: Props) => {
  const inviteBtnRef = useRef(0);
  const facePileRef = useRef(0);

  useEffect(() => {
    if (inviteBtnRef) {
      //@ts-ignore
      setInviteBtnPosition(inviteBtnRef.current.offsetLeft);
    }
  }, [inviteBtnRef]);

  const handleAvatarClick = (x: MemberInfo | null, idx: number) => {
    //can you check if this is already open and do nothing on click?
    setPopoverMember(x);
    //@ts-ignore
    setFacePilePosition(facePileRef.current.offsetLeft + idx * 28);
  };

  return (
    <Wrapper>
      <LeftWrapper>
        <BoardTitleForm text={board.name} submitData={submitData} />
        <Divider />
        {/* @ts-ignore */}
        <FacePile ref={facePileRef}>
          {board.members.map((x, index): any => (
            <Avatar
              tabIndex={0}
              key={x.idMember}
              index={board.members.length - index}
              onClick={() => handleAvatarClick(x, index)}
            >
              <Initials>{x.initials}</Initials>
              {x.memberType === 'admin' && <AdminBadge></AdminBadge>}
            </Avatar>
          ))}
        </FacePile>
        <InviteBtn
          title="Invite to board"
          onClick={() => {
            toggleInvitePopover();
          }}
          //@ts-ignore
          ref={inviteBtnRef}
        >
          <InviteText>Invite</InviteText>
        </InviteBtn>
      </LeftWrapper>
      {amAdmin && <BoardMenu handleDelete={handleDelete} id={board._id} />}
    </Wrapper>
  );
};

export default BoardHeader;
