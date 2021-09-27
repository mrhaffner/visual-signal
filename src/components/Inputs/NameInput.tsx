import styled from 'styled-components';

interface FormInputProps {
  submittedEmpty: boolean;
}

const FormInput = styled.input<FormInputProps>`
  width: 100%;
  font-size: 14px;
  background-color: #fafbfc !important;
  font-family: '-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  border: 2px solid #dfe1e6;
  border-color: ${(props) => (props.submittedEmpty ? '#DE350B' : '#dfe1e6')};
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

const NameInput = ({ register, autoFocus, submittedEmpty }: any) => {
  return (
    <FormInput
      submittedEmpty={submittedEmpty}
      name="fullName"
      autoCorrect="off"
      placeholder="Enter full name"
      // autoComplete="name"
      autoComplete="off"
      {...register('fullName', { required: true, minLength: 3, maxLength: 24 })}
      autoFocus={autoFocus}
    />
  );
};

export default NameInput;
