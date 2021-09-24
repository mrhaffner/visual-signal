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
} from './style';

const PageNotFound = () => {
  const { member, logOut } = useMemberContext();
  return (
    <>
      <Wrapper>
        <Content>
          <Container>
            <Title>Page not found.</Title>
            <MainText memberFound={!!member} logOut={logOut} />
            {member && (
              <>
                <LinkContainer>
                  <span>
                    Not <StyledBoldText>{member.fullName}</StyledBoldText> ?{' '}
                  </span>
                  <StyledLink onClick={logOut}>Switch Accounts</StyledLink>
                  {/* clicking logs user out and redirects to login */}
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
