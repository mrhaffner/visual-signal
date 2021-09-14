import { CloseBtn } from '../sharedStyles';
import {
  Header,
  MainContainer,
  MainContent,
  MemberInput,
  SendBtn,
  Title,
  Wrapper,
} from './style';

const InvitePopover = () => {
  return (
    <Wrapper>
      <Header>
        <Title>Invite to board</Title>
        <CloseBtn />
      </Header>
      <MainContainer>
        <MainContent>
          {/* needs to autofocus */}
          <MemberInput placeholder="Email address or name"></MemberInput>
          <SendBtn disabled={true}>Send invitation</SendBtn>
        </MainContent>
      </MainContainer>
    </Wrapper>
  );
};

export default InvitePopover;
