import { useEffect, useRef, useState } from 'react';
import useKeyPress from '../../../hooks/useKeyPress';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { MemberInfo, MemberType } from '../../../types';
import SecondaryPopover from './SecondaryContent';
import MainPopoverContent from './MainPopoverContent';
import { Wrapper } from './style';
import useMutateRemoveMember from '../../../hooks/mutations/member/useMutateRemoveMember';
import useMutateUpdateMemberLevel from '../../../hooks/mutations/member/useMutateUpdateMemberLevel';

interface Props {
  member: MemberInfo;
  memberCount: number;
  adminCount: number;
  myId: string;
  myMemberLevel: MemberType;
  boardId: string;
  facePilePosition: number;
  setPopoverMember: (member: MemberInfo | null) => void;
}

const ProfilePopover = ({
  member,
  memberCount,
  myId,
  adminCount,
  myMemberLevel,
  boardId,
  facePilePosition,
  setPopoverMember,
}: Props) => {
  const removeMember = useMutateRemoveMember();
  const updateMemberLevel = useMutateUpdateMemberLevel();

  const capitalMyMemberType = myMemberLevel === 'normal' ? 'Normal' : 'Admin';
  const leaveOrRemove = member.idMember === myId ? 'leave' : 'remove';
  const onlyOneAdmin = adminCount === 1 && member.memberType === 'admin';

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

  const handleMemberLevelUpdate = (newLevel: string) => {
    const inputObj = {
      memberId: member.idMember,
      boardId,
      newMemberLevel: newLevel,
    };
    updateMemberLevel({ variables: { updateInput: inputObj } });
    setPopoverMember(null);
  };

  return (
    <Wrapper ref={ref} left={facePilePosition}>
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
