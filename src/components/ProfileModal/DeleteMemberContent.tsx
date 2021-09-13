import { ThemeProvider } from 'styled-components';
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
  StyledHr,
  StyledText,
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
        <ThemeProvider theme={{ disabled: true }}>
          <ListButton>
            Admin
            {/* Conditionally display depending on current userlevel */}
            <CheckIcon />
            <ListBtnSubText>
              Can view and edit cards, remove members, and change all settings
              for the board.
            </ListBtnSubText>
          </ListButton>
        </ThemeProvider>
        <ThemeProvider theme={{ disabled: false }}>
          <ListButton>
            Normal
            {/* Conditionally display depending on current userlevel */}
            <CheckIcon />
            <ListBtnSubText>
              Can view and edit cards. Can change some board settings.
            </ListBtnSubText>
          </ListButton>
        </ThemeProvider>
        {/* Conditionally display if there is more than one admin */}
        <>
          <StyledHr />
          <StyledText>
            You can’t change roles because there must be at least one admin.
          </StyledText>
        </>
      </ContentContainer>
    </>
  );
};

export default DeleteMemberContent;
