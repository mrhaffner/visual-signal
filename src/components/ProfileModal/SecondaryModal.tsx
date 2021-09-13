import ChangeMemberContent from './ChangeMemberContent';
import { MemberInfo, MemberType } from '../../types';

import {
  CloseBtn,
  ContentContainer,
  NewHeaderWrapper,
  BackButton,
  NewHeaderText,
} from './styles';
import LeaveRemoveContent from './LeaveRemoveContent';

interface Props {
  memberLevel: MemberType;
  adminCount: number;
  modalContentType: string;
  setModalMember: (member: MemberInfo | null) => void;
  setModalContentType: (input: string) => void;
}

const SecondaryModal = ({
  memberLevel,
  adminCount,
  modalContentType,
  setModalMember,
  setModalContentType,
}: Props) => {
  return (
    <>
      <NewHeaderWrapper>
        <BackButton onClick={() => setModalContentType('main')}></BackButton>
        <NewHeaderText>Change permissions</NewHeaderText>
        <CloseBtn onClick={() => setModalMember(null)}></CloseBtn>
      </NewHeaderWrapper>
      <ContentContainer>
        {modalContentType === 'levelChange' && (
          <ChangeMemberContent
            memberLevel={memberLevel}
            adminCount={adminCount}
            setModalContentType={setModalContentType}
          />
        )}
        {(modalContentType === 'leave' || modalContentType === 'remove') && (
          <LeaveRemoveContent leaveOrRemove={modalContentType} />
        )}
      </ContentContainer>
    </>
  );
};

export default SecondaryModal;
