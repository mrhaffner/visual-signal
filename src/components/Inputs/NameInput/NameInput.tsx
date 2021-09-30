import { FormInput } from './style';

const NameInput = ({ register, autoFocus, submittedEmpty }: any) => {
  return (
    <FormInput
      submittedEmpty={submittedEmpty}
      name="fullName"
      autoCorrect="off"
      placeholder="Enter full name"
      autoComplete="name"
      {...register('fullName', { required: true, minLength: 3, maxLength: 24 })}
      autoFocus={autoFocus}
    />
  );
};

export default NameInput;
