import { useEffect, useRef, useState } from 'react';
import useKeyPress from '../../../hooks/useKeyPress';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { MemberInfo, MemberType } from '../../../types';
import SecondaryPopover from './SecondaryContent';
import MainPopoverContent from './MainPopoverContent';
import { Wrapper } from './style';

interface Props {
  member: MemberInfo;
  memberCount: number;
  adminCount: number;
  myId: string;
  myMemberLevel: MemberType;
  setPopoverMember: (member: MemberInfo | null) => void;
}

const ProfilePopover = ({
  member,
  memberCount,
  myId,
  adminCount,
  myMemberLevel,
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

  const capitalMyMemberType = 'owner'
    ? 'Admin'
    : myMemberLevel[0] + myMemberLevel.substring(1);

  const leaveOrRemove = member.idMember === myId ? 'leave' : 'remove';

  return (
    <Wrapper ref={ref}>
      {popoverContentType === 'main' && (
        <MainPopoverContent
          member={member}
          setPopoverMember={setPopoverMember}
          memberCount={memberCount}
          leaveOrRemove={leaveOrRemove}
          capitalMyMemberType={capitalMyMemberType}
          setPopoverContentType={setPopoverContentType}
        />
      )}
      {popoverContentType !== 'main' && (
        <SecondaryPopover
          setPopoverMember={setPopoverMember}
          popoverContentType={popoverContentType}
          setPopoverContentType={setPopoverContentType}
          memberLevel={member.memberType}
          adminCount={adminCount}
        />
      )}
    </Wrapper>
  );
};

export default ProfilePopover;
