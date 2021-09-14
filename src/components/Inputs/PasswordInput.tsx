import styled from 'styled-components';

const FormInput = styled.input`
  width: 100%;
  font-size: 14px;
  background-color: #fafbfc !important;
  font-family: '-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  border: 2px solid #dfe1e6;
  box-sizing: border-box;
  border-radius: 3px;
  height: 44px;
  transition: background-color 0.2s ease-in-out 0s,
    border-color 0.2s ease-in-out 0s;
  background: #edeff0;
  padding: 0.5em;
  max-width: 400px;
  margin: 0 0 1.2em;
  font-weight: 300;
  &:focus {
    background-color: white;
    border: 2px solid #4c9aff;
    box-shadow: 0 0 0;
  }
`;

const PasswordInput = ({ register }: any) => {
  return (
    <FormInput
      type="password"
      name="password"
      tabIndex={0}
      autoCorrect="off"
      spellCheck="false"
      autoCapitalize="false"
      placeholder="Enter password"
      autoComplete="current-password"
      {...register('password', { required: true })}
    />
  );
};

export default PasswordInput;
