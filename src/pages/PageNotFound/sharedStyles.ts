import styled from 'styled-components';

export const Wrapper = styled.main`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  flex-grow: 1;
`;

export const Container = styled.div`
  display: block;
  margin: 75px auto;
  text-align: center;
  max-width: 600px;
  color: #6b778c;
`;

export const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 24px;
  font-weight: 600;
  line-height: 28px;
  margin: 0 0 12px;
  text-align: center;
  color: #6b778c;
`;

export const StyledText = styled.p`
  font-size: 18px;
  line-height: 22px;
  margin: 0 0 8px;
  color: #6b778c;
`;

export const LinkContainer = styled.div`
  color: #172b4d;
  font-size: 14px;
  margin-top: 32px;
  text-align: center;
`;

export const StyledBoldText = styled.strong`
  font-weight: 700;
`;

export const StyledLink = styled.a`
  color: #172b4d;
  cursor: pointer;
  text-decoration: underline;
  &:active,
  :hover {
    outline: 0;
  }

  &:focus-visible {
    outline: -webkit-focus-ring-color auto 1px;
  }
`;
