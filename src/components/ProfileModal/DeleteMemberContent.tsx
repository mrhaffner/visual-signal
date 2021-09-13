import { ThemeProvider } from 'styled-components';
import { MemberInfo, MemberType } from '../../types';

import {
  CloseBtn,
  ContentContainer,
  ListButton,
  NewHeaderWrapper,
  BackButton,
  NewHeaderText,
  CheckIcon,
  ListBtnSubText,
  StyledHr,
  StyledText,
} from './styles';

interface Props {
  memberLevel: MemberType;
  adminCount: number;
  setModalMember: (member: MemberInfo | null) => void;
  setShowDeleteContent: (input: boolean) => void;
}

const DeleteMemberContent = ({
  memberLevel,
  adminCount,
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
        <ThemeProvider
          theme={
            memberLevel === 'normal' ? { disabled: false } : { disabled: true }
          }
        >
          {/* buttons don't work if admin count === 1 */}
          <ListButton>
            Admin
            {memberLevel !== 'normal' && <CheckIcon />}
            <ListBtnSubText>
              Can view and edit cards, remove members, and change all settings
              for the board.
            </ListBtnSubText>
          </ListButton>
        </ThemeProvider>
        <ThemeProvider
          theme={
            memberLevel === 'normal' ? { disabled: true } : { disabled: false }
          }
        >
          <ListButton>
            Normal
            {memberLevel === 'normal' && <CheckIcon />}
            <ListBtnSubText>
              Can view and edit cards. Can change some board settings.
            </ListBtnSubText>
          </ListButton>
        </ThemeProvider>
        {adminCount === 1 && (
          <>
            <StyledHr />
            <StyledText>
              You can’t change roles because there must be at least one admin.
            </StyledText>
          </>
        )}
      </ContentContainer>
    </>
  );
};

export default DeleteMemberContent;
