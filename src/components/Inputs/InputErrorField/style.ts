import styled from 'styled-components';

export const Wrapper = styled.div`
  font-size: 0.857143em;
  font-style: inherit;
  line-height: 1.33333;
  font-weight: normal;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  margin-top: 4px;
  display: flex;
  margin-top: -16px;
  padding: 0;
  position: absolute;
`;

export const Container = styled.span`
  font-size: 0.857143em;
  font-style: inherit;
  line-height: 1.33333;
  font-weight: normal;
  display: flex;
`;

export const Logo = styled.span`
  display: inline-block;
  flex-shrink: 0;
  line-height: 1;
  width: 16px;
  height: 16px;
`;

export const SVG = styled.svg`
  width: 16px;
  height: 16px;
  overflow: hidden;
  pointer-events: none;
  max-width: 100%;
  max-height: 100%;
  color: white;
  fill: #de350b;
  vertical-align: bottom;
`;

export const StyledText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #de350b;
`;
