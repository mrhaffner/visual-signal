import { useEffect, useRef, useState } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { MemberInfo, MemberType } from '../../types';
import SecondaryModal from './SecondaryModal';
import MainModalContent from './MainModalContent';
import { Wrapper } from './styles';

interface Props {
  member: MemberInfo;
  memberCount: number;
  adminCount: number;
  myId: string;
  myMemberLevel: MemberType;
  setModalMember: (member: MemberInfo | null) => void;
}

const ProfileModal = ({
  member,
  memberCount,
  myId,
  adminCount,
  myMemberLevel,
  setModalMember,
}: Props) => {
  const [modalContentType, setModalContentType] = useState('main');

  const ref = useRef(null);
  const esc = useKeyPress('Escape');

  useOnClickOutside(ref, () => {
    setModalMember(null);
  });

  useEffect(() => {
    if (esc) {
      setModalMember(null);
    }
  }, [esc]);

  const capitalMyMemberType = 'owner'
    ? 'Admin'
    : myMemberLevel[0] + myMemberLevel.substring(1);

  const leaveOrRemove = member.idMember === myId ? 'leave' : 'remove';

  return (
    <Wrapper ref={ref}>
      {modalContentType === 'main' && (
        <MainModalContent
          member={member}
          setModalMember={setModalMember}
          memberCount={memberCount}
          leaveOrRemove={leaveOrRemove}
          capitalMyMemberType={capitalMyMemberType}
          setModalContentType={setModalContentType}
        />
      )}
      {modalContentType !== 'main' && (
        <SecondaryModal
          setModalMember={setModalMember}
          modalContentType={modalContentType}
          setModalContentType={setModalContentType}
          memberLevel={member.memberType}
          adminCount={adminCount}
        />
      )}
    </Wrapper>
  );
};

export default ProfileModal;
