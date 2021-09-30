import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
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

export const Logo = styled.img`
  display: block;
  height: 43px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
  margin-bottom: 40px;
  vertical-align: middle;
  border: 0;
`;

export const MainSection = styled.section`
  width: 100%;
  padding: 0px;
  overflow: visible;
  margin-bottom: 30px;
`;

export const MainWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  position: relative;
`;

export const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 3px;
  padding: 25px 40px;
  box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
  display: block;
  max-width: 585px;
  margin: 0 auto;
  position: relative;
`;

export const Title = styled.h1`
  text-align: center;
  color: #5e6c84;
  font-size: 16px;
  letter-spacing: -0.01em;
  line-height: 28px;
  margin-top: 10px;
  margin-bottom: 25px;
  font-weight: bold;
`;

export const Line = styled.hr`
  margin-top: 25px;
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid hsl(0, 0%, 80%);
  margin: 1em 0;
  padding: 0;
`;

export const BottomFormLink = styled.span`
  text-align: center;
  font-size: 14px;
  display: block;
  padding: 0;
  font-weight: 300;
`;

export const BottomLink = styled(Link)`
  text-decoration: none;
  color: #0052cc;
  background: transparent;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;

export const LeftImgContainer = styled.div`
  position: absolute;
  width: 400px;
  bottom: -16px;
  left: 0;
  max-width: 30%;
  z-index: -999;

  @media only screen and (max-width: 1050px) {
    display: none;
  }
`;

export const RightImgContainer = styled.div`
  position: absolute;
  width: 400px;
  bottom: -16px;
  right: 0;
  max-width: 30%;
  z-index: -999;
  @media only screen and (max-width: 1050px) {
    display: none;
  }
`;

export const LogInPrompt = styled.div`
  border-radius: 4px;
  background: #faf3c0;
  border: 1px solid #f2d600;
  display: inline-block;
  padding: 0.5em 1em;
  word-wrap: break-word;
  color: #4d4d4d;
  font-weight: 300;
  font-family: '-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

export const LogInLink = styled(Link)`
  color: #298fca;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
  line-height: 28.8px;
  &:focus-visible {
    outline: -webkit-focus-ring-color auto 1px;
  }
`;

export const StyledPromptText = styled.div`
  line-height: 28.8px;
  font-size: 14px;
`;
