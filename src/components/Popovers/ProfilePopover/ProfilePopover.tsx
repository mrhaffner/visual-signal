import { useEffect, useRef, useState } from 'react';
import useKeyPress from '../../../hooks/useKeyPress';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { MemberInfo, MemberType } from '../../../types';
import SecondaryPopover from './SecondaryContent';
import MainPopoverContent from './MainPopoverContent';
import { Wrapper } from './style';
import { useMutation } from '@apollo/client';
import {
  REMOVE_MEMBER_FROM_BOARD,
  UPDATE_MEMBER_LEVEL_BOARD,
} from '../../../graphql/mutations/all';

interface Props {
  member: MemberInfo;
  memberCount: number;
  adminCount: number;
  myId: string;
  myMemberLevel: MemberType;
  boardId: string;
  setPopoverMember: (member: MemberInfo | null) => void;
}

const ProfilePopover = ({
  member,
  memberCount,
  myId,
  adminCount,
  myMemberLevel,
  boardId,
  setPopoverMember,
}: Props) => {
  const [popoverContentType, setPopoverContentType] = useState('main');

  const ref = useRef(null);
  const esc = useKeyPress('Escape');

  useOnClickOutside(ref, () => {
    setPopoverMember(null);
  });

  useEffect(() => {
    if (esc) {
      setPopoverMember(null);
    }
  }, [esc]);

  const capitalMyMemberType = myMemberLevel === 'normal' ? 'Normal' : 'Admin';

  const leaveOrRemove = member.idMember === myId ? 'leave' : 'remove';

  const [removeMember] = useMutation(REMOVE_MEMBER_FROM_BOARD);

  const handleRemove = () => {
    const inputObj = {
      memberId: member.idMember,
      boardId,
    };
    removeMember({
      variables: {
        removeInput: inputObj,
      },
    });
    setPopoverMember(null);
  };

  const [updateMemberLevel] = useMutation(UPDATE_MEMBER_LEVEL_BOARD);

  const handleMemberLevelUpdate = (newLevel: string) => {
    const inputObj = {
      memberId: member.idMember,
      boardId,
      newMemberLevel: newLevel,
    };
    updateMemberLevel({ variables: { updateInput: inputObj } });
    setPopoverMember(null);
  };

  const onlyOneAdmin = adminCount === 1 && member.memberType === 'admin';

  return (
    <Wrapper ref={ref}>
      {popoverContentType === 'main' && (
        <MainPopoverContent
          myId={myId}
          member={member}
          setPopoverMember={setPopoverMember}
          memberCount={memberCount}
          leaveOrRemove={leaveOrRemove}
          capitalMyMemberType={capitalMyMemberType}
          setPopoverContentType={setPopoverContentType}
          onlyOneAdmin={onlyOneAdmin}
        />
      )}
      {popoverContentType !== 'main' && (
        <SecondaryPopover
          setPopoverMember={setPopoverMember}
          popoverContentType={popoverContentType}
          setPopoverContentType={setPopoverContentType}
          memberLevel={member.memberType}
          onlyOneAdmin={onlyOneAdmin}
          handleRemove={handleRemove}
          handleMemberLevelUpdate={handleMemberLevelUpdate}
        />
      )}
    </Wrapper>
  );
};

export default ProfilePopover;
