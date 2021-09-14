import {
  Header,
  ContentContainer,
  Profile,
  Avatar,
  Initials,
  InfoContainer,
  Title,
  // TitleLink,
  StyledText,
  ListButton,
  PermissionLevel,
  StyledHr,
} from './style';
import { MemberInfo } from '../../../types';
import { ThemeProvider } from 'styled-components';
import { CloseBtn } from '../sharedStyles';

interface Props {
  myId: string;
  member: MemberInfo;
  memberCount: number;
  adminCount: number;

  leaveOrRemove: string;
  capitalMyMemberType: string;
  setPopoverMember: (member: MemberInfo | null) => void;
  setPopoverContentType: (input: string) => void;
}

const MainPopoverContent = ({
  myId,
  member,
  memberCount,
  adminCount,
  capitalMyMemberType,
  leaveOrRemove,
  setPopoverMember,
  setPopoverContentType,
}: Props) => {
  const removeText =
    leaveOrRemove === 'leave' ? 'Leave board...' : 'Remove from board...';
  return (
    <>
      <Header>
        <CloseBtn onClick={() => setPopoverMember(null)}></CloseBtn>
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
            capitalMyMemberType === 'Normal'
              ? { disabled: true }
              : { disabled: false }
          }
        >
          <ListButton onClick={() => setPopoverContentType('levelChange')}>
            Change permissions...
            <PermissionLevel>({capitalMyMemberType})</PermissionLevel>
          </ListButton>
        </ThemeProvider>
        {/* {(member.memberType === 'admin' || member.memberType === 'owner') && */}
        {((capitalMyMemberType === 'Admin' && adminCount > 1) ||
          member.idMember === myId) &&
          memberCount > 1 && (
            // this will setPopoverContentType depending on whether leaving or removing
            <ListButton onClick={() => setPopoverContentType(leaveOrRemove)}>
              {removeText}
            </ListButton>
          )}
        {capitalMyMemberType === 'Admin' && adminCount === 1 && (
          <>
            <StyledHr />
            <StyledText>
              You can’t leave because you are the only admin. To make another
              user an admin, click their avatar, select “Change permissions…”,
              and select “Admin”.
            </StyledText>
          </>
        )}
      </ContentContainer>
    </>
  );
};

export default MainPopoverContent;
