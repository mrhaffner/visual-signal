import { CloseBtn } from '../sharedStyles';
import { Header, Title, Wrapper } from './style';

const InvitePopover = () => {
  return (
    <Wrapper>
      <Header>
        <Title>Invite to board</Title>
        <CloseBtn />
      </Header>
    </Wrapper>
  );
};

export default InvitePopover;
