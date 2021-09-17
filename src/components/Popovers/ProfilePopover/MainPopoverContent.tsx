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
  onlyOneAdmin: boolean;
  leaveOrRemove: string;
  capitalMyMemberType: string;
  setPopoverMember: (member: MemberInfo | null) => void;
  setPopoverContentType: (input: string) => void;
}

const MainPopoverContent = ({
  myId,
  member,
  memberCount,
  onlyOneAdmin,
  capitalMyMemberType,
  leaveOrRemove,
  setPopoverMember,
  setPopoverContentType,
}: Props) => {
  const handlePermissionChange = () => {
    if (capitalMyMemberType === 'Admin') {
      setPopoverContentType('levelChange');
    }
  };
  const iAmNotOnlyAdmin =
    capitalMyMemberType !== 'Admin' ? true : onlyOneAdmin ? false : true;

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
          <ListButton onClick={() => handlePermissionChange()}>
            Change permissions...
            <PermissionLevel>({capitalMyMemberType})</PermissionLevel>
          </ListButton>
        </ThemeProvider>
        {/* perhaps this should be it's own component HandleLeaveRemove */}
        {member.idMember !== myId && capitalMyMemberType === 'Admin' && (
          <ListButton onClick={() => setPopoverContentType(leaveOrRemove)}>
            Remove from board...
          </ListButton>
        )}
        {member.idMember === myId && memberCount > 1 && iAmNotOnlyAdmin && (
          <ListButton onClick={() => setPopoverContentType(leaveOrRemove)}>
            Leave board...
          </ListButton>
        )}
        {capitalMyMemberType === 'Admin' &&
          onlyOneAdmin &&
          member.idMember === myId && (
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
