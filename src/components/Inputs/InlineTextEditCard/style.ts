import styled from 'styled-components';

export const Wrapper = styled.span`
  word-wrap: break-word;
  clear: both;
  color: #172b4d;
  display: block;
  margin: 0 0 4px;
  overflow: hidden;
  text-decoration: none;
`;

interface SurfaceStyleProps {
  isInputActive: boolean;
}

export const Surface = styled.span<SurfaceStyleProps>`
  cursor: pointer;
  display: ${(props) => (props.isInputActive ? 'none' : '')};
  cursor: ${(props) => (props.isInputActive ? '' : 'pointer')};
`;

interface InputStyleProps {
  isInputActive: boolean;
}

export const TextInput = styled.input<InputStyleProps>`
  display: ${(props) => (props.isInputActive ? '' : 'none')};
  font: inherit;
  color: inherit;
  text-align: inherit;
  padding: 0;
  background: none;
  border: none;
  outline: none;
  width: 100%;
`;
