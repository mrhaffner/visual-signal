import ChangeMemberContent from './ChangeMemberContent';
import { MemberInfo, MemberType } from '../../types';

import {
  CloseBtn,
  ContentContainer,
  NewHeaderWrapper,
  BackButton,
  NewHeaderText,
} from './styles';

interface Props {
  memberLevel: MemberType;
  adminCount: number;
  modalContentType: string;
  setModalMember: (member: MemberInfo | null) => void;
  setModalContentType: (input: string) => void;
}

//update header text depending on type
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
      </ContentContainer>
    </>
  );
};

export default SecondaryModal;
