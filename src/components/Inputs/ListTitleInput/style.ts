import styled from 'styled-components';

export const StyledTextArea = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  height: 28px;
  resize: none;
  background: #0000;
  border-radius: 3px;
  box-shadow: none;
  font-weight: 600 !important;
  margin: -4px 0 4px 0;
  max-height: 256px;
  min-height: 20px;
  padding: 4px 8px;
  width: 90%;
  -webkit-appearance: none;
  border: none;
  box-sizing: border-box;
  display: block;
  line-height: 20px;
  outline: none;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  font: inherit;
  &:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 2px #0079bf;
  }
`;
