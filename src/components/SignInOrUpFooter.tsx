import styled from 'styled-components';

const Footer = styled.footer`
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 20px;
  margin-top: 10px;
  margin: 4em 1em;
  text-align: center;
`;

const Line = styled.hr`
  max-width: 400px;
  margin: 25px auto;
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid hsl(0, 0%, 80%);
`;

const Logo = styled.img`
  /* margin-bottom: 20px; */
  margin-bottom: 8px;
  width: 200px;
  display: inline-block;
  vertical-align: top;
  margin-top: 1px;
`;

const StyledText = styled.div`
  font-size: 12px;
  color: rgb(107, 119, 140);
  text-align: center;
  font-style: normal;
  font-weight: 400;
  line-height: 1.42857142857143;
`;

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
