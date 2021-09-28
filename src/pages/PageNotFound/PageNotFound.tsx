import { useHistory } from 'react-router';
import useMemberContext from '../../hooks/useMemberContext';
import MainText from './MainText';
import {
  Container,
  Content,
  Wrapper,
  Title,
  LinkContainer,
  StyledLink,
  StyledBoldText,
} from './sharedStyles';

const PageNotFound = () => {
  const { member, logOut } = useMemberContext();
  const history = useHistory();
  const goToLogin = () => {
    history.push('/login');
  };

  const handleLogOut = () => {
    logOut();
    goToLogin();
  };
  return (
    <>
      <Wrapper>
        <Content>
          <Container>
            <Title>Page not found.</Title>
            <MainText memberFound={!!member} goToLogin={goToLogin} />
            {member && (
              <>
                <LinkContainer>
                  <span>
                    Not <StyledBoldText>{member.fullName}</StyledBoldText> ?{' '}
                  </span>
                  <StyledLink onClick={handleLogOut}>
                    Switch Accounts
                  </StyledLink>
                </LinkContainer>
              </>
            )}
          </Container>
        </Content>
      </Wrapper>
    </>
  );
};

export default PageNotFound;
