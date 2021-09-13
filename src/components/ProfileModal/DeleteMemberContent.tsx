import { MemberInfo } from '../../types';

import {
  CloseBtn,
  ContentContainer,
  ListButton,
  NewHeaderWrapper,
  BackButton,
  NewHeaderText,
  CheckIcon,
  ListBtnSubText,
} from './styles';

interface Props {
  setModalMember: (member: MemberInfo | null) => void;
  setShowDeleteContent: (input: boolean) => void;
}

const DeleteMemberContent = ({
  setModalMember,
  setShowDeleteContent,
}: Props) => {
  return (
    <>
      <NewHeaderWrapper>
        <BackButton onClick={() => setShowDeleteContent(false)}></BackButton>
        <NewHeaderText>Change permissions</NewHeaderText>
        <CloseBtn onClick={() => setModalMember(null)}></CloseBtn>
      </NewHeaderWrapper>
      <ContentContainer>
        <ListButton>
          Admin
          <CheckIcon />
          <ListBtnSubText>
            Can view and edit cards, remove members, and change all settings for
            the board.
          </ListBtnSubText>
        </ListButton>
        <ListButton>
          Normal
          <ListBtnSubText>
            Can view and edit cards. Can change some board settings.
          </ListBtnSubText>
        </ListButton>
      </ContentContainer>
    </>
  );
};

export default DeleteMemberContent;
