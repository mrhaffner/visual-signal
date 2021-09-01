import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Main = styled.div`
  background-color: #f9fafc;
  position: relative;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`;

const Logo = styled.img`
  display: block;
  height: 43px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
  margin-bottom: 40px;
  vertical-align: middle;
  border: 0;
`;

const MainSection = styled.section`
  width: 100%;
  padding: 0px;
  overflow: visible;
  margin-bottom: 30px;
`;

const MainWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  position: relative;
`;

const SignUpForm = styled.div`
  background-color: #ffffff;
  border-radius: 3px;
  padding: 25px 40px;
  box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
  display: block;
  max-width: 585px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  color: #5e6c84;
  font-size: 16px;
  letter-spacing: -0.01em;
  line-height: 28px;
  margin-top: 10px;
  margin-bottom: 25px;
  font-weight: bold;
`;

const SignUpContainer = styled.form``;

const EmailInput = styled.input`
  width: 100%;
  font-size: 14px;
  background-color: #fafbfc !important;
  font-family: '-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  border: 2px solid #dfe1e6;
  box-sizing: border-box;
  border-radius: 3px;
  height: 44px;
  transition: background-color 0.2s ease-in-out 0s,
    border-color 0.2s ease-in-out 0s;
  background: #edeff0;
  padding: 0.5em;
  max-width: 400px;
  margin: 0 0 1.2em;
  font-weight: 300;
  &:focus {
    background-color: white;
    border: 2px solid #4c9aff;
    box-shadow: 0 0 0;
  }
`;

const TOS = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 12px;
  line-height: 16px;
  color: #5e6c84;
  font-weight: 300;
`;

const SubmitButton = styled.input`
  background: #5aac44;
  color: #fff;
  width: 100%;
  box-shadow: none;
  margin-bottom: 0;
  -webkit-appearance: button;
  cursor: pointer;
  border-radius: 0.3em;
  display: inline-block;
  font-weight: bold;
  font-size: 14px;
  padding: 0.6em 1.3em;
  position: relative;
  text-decoration: none;
  border: 0px;
  margin: 0 0 1.2em;
  &:hover {
    background: #61bd4f;
  }
  /* background: #e2e4e6; */
  /* color: hsl(0, 0%, 55%); */
  /* cursor: default; */
  //get rid of hover
`;

const Line = styled.hr`
  margin-top: 25px;
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid hsl(0, 0%, 80%);
  margin: 1em 0;
  padding: 0;
`;

const LoginLinkContainer = styled.span`
  text-align: center;
  font-size: 14px;
  display: block;
  padding: 0;
  font-weight: 300;
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  color: #0052cc;
  background: transparent;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;

const SignUp = () => {
  return (
    <Main>
      <Logo src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg" />
      <MainSection>
        <MainWrapper>
          <SignUpForm>
            <Title>Sign up for your account</Title>
            <SignUpContainer>
              <EmailInput
                type="email"
                name="email"
                tabIndex={0}
                autoCorrect="off"
                spellCheck="false"
                autoCapitalize="false"
                placeholder="Enter email"
                autoComplete="usernam email"
              />
              <TOS>
                By signing up, you confirm that you've read and accepted our
                Terms of Service and Privacy Policy.
              </TOS>
              <SubmitButton tabIndex={0} type="submit" value="Continue" />
            </SignUpContainer>
            <Line />
            <LoginLinkContainer>
              <LoginLink to="/login">Already have an account? Log In</LoginLink>
            </LoginLinkContainer>
          </SignUpForm>
        </MainWrapper>
      </MainSection>
    </Main>
  );
};

export default SignUp;
