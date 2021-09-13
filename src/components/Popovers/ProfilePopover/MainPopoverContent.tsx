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
} from './style';
import { MemberInfo } from '../../../types';
import { ThemeProvider } from 'styled-components';
import { CloseBtn } from '../sharedStyles';

interface Props {
  member: MemberInfo;
  memberCount: number;
  leaveOrRemove: string;
  capitalMyMemberType: string;
  setPopoverMember: (member: MemberInfo | null) => void;
  setPopoverContentType: (input: string) => void;
}

const MainPopoverContent = ({
  member,
  memberCount,
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
            capitalMyMemberType === 'normal'
              ? { disabled: true }
              : { disabled: false }
          }
        >
          <ListButton onClick={() => setPopoverContentType('levelChange')}>
            Change permissions...
            <PermissionLevel>({capitalMyMemberType})</PermissionLevel>
          </ListButton>
        </ThemeProvider>
        {(member.memberType === 'admin' || member.memberType === 'owner') &&
          memberCount > 1 && (
            // this will setPopoverContentType depending on whether leaving or removing
            <ListButton onClick={() => setPopoverContentType(leaveOrRemove)}>
              {removeText}
            </ListButton>
          )}
      </ContentContainer>
    </>
  );
};

export default MainPopoverContent;
