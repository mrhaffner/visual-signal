import { Footer, Line, Logo, StyledText } from './style';

const SignInOrUpFooter = () => {
  return (
    <Footer>
      <div>
        <Line />
        <Logo
          width="200"
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/16006ae28f149063408d601e8c80eddc/atlassian-logo-blue-small.svg"
        />
        <StyledText>
          One account for Trello, Jira, Confluence and more.
        </StyledText>
      </div>
    </Footer>
  );
};

export default SignInOrUpFooter;
