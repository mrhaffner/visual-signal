import styled from 'styled-components';

export const TitleContainer = styled.div`
  color: #172b4d;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  max-width: 30vw;
  overflow: hidden;
  padding: 0;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 3px;
  height: 32px;
  margin: 0 4px 4px 0;
  position: relative;
  &:hover {
    background-color: #00000029;
  }
`;

export const TitleText = styled.h1`
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  padding: 0 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TitleInput = styled.input`
  background-color: #fff;
  border: 0;
  font-size: 18px;
  font-weight: 700;
  height: 32px;
  margin: 0;
  padding: 0 12px;
  -webkit-appearance: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  box-sizing: border-box;
  line-height: 20px;
  outline: none;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  font: inherit;
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: start;
  -webkit-rtl-ordering: logical;
  cursor: text;
  &:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 2px #0079bf;
    outline: 0;
  }
`;
