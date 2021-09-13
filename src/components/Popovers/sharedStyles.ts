import styled from 'styled-components';

export const CloseBtn = styled.a`
  color: #6b778c;
  padding: 10px 12px 10px 8px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  width: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  font-family: trellicons;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  vertical-align: bottom;
  cursor: pointer;
  &:before {
    content: '\\e91c';
  }
  &:active,
  :hover {
    outline: none;
  }
  &:hover {
    color: #172b4d;
  }
`;
