import styled from 'styled-components';

interface StyleProps {
  disabled: boolean;
}

const SubmitButton = styled.input<StyleProps>`
  background: ${(props) => (props.disabled ? '#e2e4e6' : '#5aac44')};
  color: ${(props) => (props.disabled ? 'hsl(0, 0%, 55%)' : '#fff')};
  width: 100%;
  box-shadow: none;
  margin-bottom: 0;
  -webkit-appearance: button;
  cursor: ${(props) => (props.disabled ? 'inherit' : 'pointer')};
  border-radius: 0.3em;
  display: inline-block;
  font-weight: bold;
  font-size: 14px;
  padding: 0.6em 1.3em;
  position: relative;
  text-decoration: none;
  border: 0px;
  margin: 0 0 1.2em;
  &:hover {
    background: ${(props) => (props.disabled ? '#e2e4e6' : '#61bd4f')};
  }
  //disabled
  /* background: #e2e4e6; */
  /* color: hsl(0, 0%, 55%); */
  /* cursor: default; */
  //get rid of hover

  //sign up
  /* background-color: rgb(0, 82, 204);
  &:hover {
    background: var(--background-boldBrand-hover, #0065ff);
    text-decoration: inherit;
    transition-duration: 0s, 0.15s;
  }
  &:active {
    background: var(--background-boldBrand-pressed, #0747a6);
    transition-duration: 0s, 0s;
  } */
`;

const LogSignFormButton = ({ value, disabled }: any) => {
  return (
    <SubmitButton
      tabIndex={0}
      type="submit"
      value={value}
      disabled={disabled}
    />
  );
};

export default LogSignFormButton;
