import SignInOrUpFooter from './SignInOrUpFooter';
import {
  BottomFormLink,
  BottomLink,
  FormContainer,
  LeftImgContainer,
  Line,
  LogInLink,
  LogInPrompt,
  Logo,
  MainSection,
  MainWrapper,
  RightImgContainer,
  StyledPromptText,
  Title,
  Wrapper,
} from './style';

const SignInOrUpPage = ({
  bottomLink,
  formTitle,
  form,
  emailInUse = false,
}: any) => (
  <Wrapper>
    <div>
      <Logo src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg" />
      <MainSection>
        <MainWrapper>
          <FormContainer>
            {emailInUse && (
              <LogInPrompt>
                <StyledPromptText>
                  Hey, that email is already in use by another Atlassian
                  account. You'll need to login with Atlassian to use Trello.
                </StyledPromptText>
                <LogInLink to="/login">Log in with Atlassian</LogInLink>
              </LogInPrompt>
            )}
            <Title>{formTitle}</Title>
            {form}
            <Line />
            <BottomFormLink>
              <BottomLink to={bottomLink.link}>{bottomLink.text}</BottomLink>
            </BottomFormLink>
          </FormContainer>
        </MainWrapper>
      </MainSection>
    </div>
    <SignInOrUpFooter />
    <LeftImgContainer>
      <img
        src={require('../../../assets/logo_left.svg').default}
        width="400"
        height="400"
      />
    </LeftImgContainer>
    <RightImgContainer>
      <img
        src={require('../../../assets/logo_right.svg').default}
        width="400"
        height="400"
      />
    </RightImgContainer>
  </Wrapper>
);

export default SignInOrUpPage;
