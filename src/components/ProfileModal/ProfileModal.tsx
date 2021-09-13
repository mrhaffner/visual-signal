import { useEffect, useRef, useState } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useToggle from '../../hooks/useToggle';
import { MemberInfo } from '../../types';
import DeleteMemberContent from './DeleteMemberContent';
import MainModalContent from './MainModalContent';
import { Wrapper } from './styles';

interface Props {
  member: MemberInfo;
  memberCount: number;
  myId: string;
  setModalMember: (member: MemberInfo | null) => void;
}

const ProfileModal = ({ member, memberCount, myId, setModalMember }: Props) => {
  const [showDeleteContent, setShowDeleteContent] = useState(false);
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

  const capitalMemberType = 'owner'
    ? 'Admin'
    : member.memberType.toUpperCase()[0] + member.memberType.substring(1);

  const removeText =
    member.idMember === myId ? 'Leave board...' : 'Remove from board...';

  return (
    <Wrapper ref={ref}>
      {!showDeleteContent && (
        <MainModalContent
          member={member}
          setModalMember={setModalMember}
          memberCount={memberCount}
          removeText={removeText}
          capitalMemberType={capitalMemberType}
          setShowDeleteContent={setShowDeleteContent}
        />
      )}
      {showDeleteContent && (
        <DeleteMemberContent
          setModalMember={setModalMember}
          setShowDeleteContent={setShowDeleteContent}
        />
      )}
    </Wrapper>
  );
};

export default ProfileModal;
