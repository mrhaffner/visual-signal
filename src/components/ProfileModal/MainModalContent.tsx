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
  Username,
  ListButton,
  PermissionLevel,
} from './styles';
import { MemberInfo } from '../../types';

interface Props {
  member: MemberInfo;
  memberCount: number;
  removeText: string;
  capitalMemberType: string;
  setModalMember: (member: MemberInfo | null) => void;
  setShowDeleteContent: (input: boolean) => void;
}

const MainModalContent = ({
  member,
  memberCount,
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
            <Username>@{member.username}</Username>
          </InfoContainer>
        </Profile>
        <ListButton onClick={() => setShowDeleteContent(true)}>
          Change permissions...
          <PermissionLevel>({capitalMemberType})</PermissionLevel>
        </ListButton>
        {member.memberType === 'admin' ||
          (member.memberType === 'owner' && memberCount > 1 && (
            <ListButton>{removeText}</ListButton>
          ))}
      </ContentContainer>
    </>
  );
};

export default MainModalContent;
