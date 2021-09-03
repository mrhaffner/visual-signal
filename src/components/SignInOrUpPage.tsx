import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SignInOrUpFooter from './SignInOrUpFooter';
import AtlassianBackground from './AtlassianBackground';

const Wrapper = styled.div`
  background-color: #f9fafc;
  min-height: 100vh;
  display: flex;
  z-index: -900;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  flex-direction: column;
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

const FormContainer = styled.div`
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

const Line = styled.hr`
  margin-top: 25px;
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid hsl(0, 0%, 80%);
  margin: 1em 0;
  padding: 0;
`;

const BottomFormLink = styled.span`
  text-align: center;
  font-size: 14px;
  display: block;
  padding: 0;
  font-weight: 300;
`;

const BottomLink = styled(Link)`
  text-decoration: none;
  color: #0052cc;
  background: transparent;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;

const LeftImgContainer = styled.div`
  position: absolute;
  width: 400px;
  bottom: -16px;
  left: 0;
  max-width: 30%;
  z-index: -999;
`;

const RightImgContainer = styled.div`
  position: absolute;
  width: 400px;
  bottom: -16px;
  right: 0;
  max-width: 30%;
  z-index: -999;
`;

const SignInOrUpPage = ({ bottomLink, formTitle, form }: any) => {
  return (
    <Wrapper>
      <div>
        <Logo src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg" />
        <MainSection>
          <MainWrapper>
            <FormContainer>
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
          src={require('../assets/logo_left.svg').default}
          width="400"
          height="400"
        />
      </LeftImgContainer>
      <RightImgContainer>
        <img
          src={require('../assets/logo_right.svg').default}
          width="400"
          height="400"
        />
      </RightImgContainer>
    </Wrapper>
  );
};

export default SignInOrUpPage;
