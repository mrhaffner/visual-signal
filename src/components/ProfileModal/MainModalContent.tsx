import {
  Header,
  CloseBtn,
  ContentContainer,
  Profile,
  Avatar,
  Initials,
  InfoContainer,
  Title,
  TitleLink,
  StyledText,
  ListButton,
  PermissionLevel,
} from './styles';
import { MemberInfo } from '../../types';
import { ThemeProvider } from 'styled-components';

interface Props {
  member: MemberInfo;
  memberCount: number;
  leaveOrRemove: string;
  capitalMyMemberType: string;
  setModalMember: (member: MemberInfo | null) => void;
  setModalContentType: (input: string) => void;
}

const MainModalContent = ({
  member,
  memberCount,
  capitalMyMemberType,
  leaveOrRemove,
  setModalMember,
  setModalContentType,
}: Props) => {
  const removeText =
    leaveOrRemove === 'leave' ? 'Leave board...' : 'Remove from board...';
  return (
    <>
      <Header>
        <CloseBtn onClick={() => setModalMember(null)}></CloseBtn>
      </Header>
      <ContentContainer>
        <Profile>
          <Avatar>
            <Initials>{member.initials}</Initials>
          </Avatar>
          <InfoContainer>
            <Title>
              {member.fullName}
              {/* <TitleLink></TitleLink> */}
            </Title>
            <StyledText>@{member.username}</StyledText>
          </InfoContainer>
        </Profile>
        <ThemeProvider
          theme={
            capitalMyMemberType === 'normal'
              ? { disabled: true }
              : { disabled: false }
          }
        >
          <ListButton onClick={() => setModalContentType('levelChange')}>
            Change permissions...
            <PermissionLevel>({capitalMyMemberType})</PermissionLevel>
          </ListButton>
        </ThemeProvider>
        {(member.memberType === 'admin' || member.memberType === 'owner') &&
          memberCount > 1 && (
            // this will setModalContentType depending on whether leaving or removing
            <ListButton onClick={() => setModalContentType(leaveOrRemove)}>
              {removeText}
            </ListButton>
          )}
      </ContentContainer>
    </>
  );
};

export default MainModalContent;
