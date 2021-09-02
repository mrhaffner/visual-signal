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
  margin-bottom: 20px;
  width: 150px;
  display: inline-block;
  vertical-align: top;
  margin-top: 1px;
`;

const SignInOrUpFooter = () => {
  return (
    <Footer>
      <div>
        <Line />
        <Logo
          width="150"
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/16006ae28f149063408d601e8c80eddc/atlassian-logo-blue-small.svg"
        />
      </div>
    </Footer>
  );
};

export default SignInOrUpFooter;
