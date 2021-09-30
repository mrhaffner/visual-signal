import { FormInput } from './style';

const PasswordRegisterInput = ({ register, submittedEmpty }: any) => {
  return (
    <FormInput
      submittedEmpty={submittedEmpty}
      type="password"
      name="password"
      autoCorrect="off"
      spellCheck="false"
      autoCapitalize="false"
      placeholder="Create password"
      autoComplete="new-password"
      {...register('password', { required: true })}
    />
  );
};

export default PasswordRegisterInput;
