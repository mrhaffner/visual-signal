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
import { MemberInfo, MemberType } from '../../types';
import { ThemeProvider } from 'styled-components';

interface Props {
  member: MemberInfo;
  memberCount: number;
  memberLevel: MemberType;
  removeText: string;
  capitalMemberType: string;
  setModalMember: (member: MemberInfo | null) => void;
  setShowDeleteContent: (input: boolean) => void;
}

const MainModalContent = ({
  member,
  memberCount,
  memberLevel,
  capitalMemberType,
  removeText,
  setModalMember,
  setShowDeleteContent,
}: Props) => {
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
              <TitleLink>{member.fullName}</TitleLink>
            </Title>
            <StyledText>@{member.username}</StyledText>
          </InfoContainer>
        </Profile>
        <ThemeProvider
          theme={
            memberLevel === 'normal' ? { disabled: true } : { disabled: false }
          }
        >
          <ListButton onClick={() => setShowDeleteContent(true)}>
            Change permissions...
            <PermissionLevel>({capitalMemberType})</PermissionLevel>
          </ListButton>
        </ThemeProvider>
        {member.memberType === 'admin' ||
          (member.memberType === 'owner' && memberCount > 1 && (
            <ListButton>{removeText}</ListButton>
          ))}
      </ContentContainer>
    </>
  );
};

export default MainModalContent;
