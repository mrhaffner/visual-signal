import { FormInput } from './style';

const PasswordInput = ({ register, submittedEmpty }: any) => {
  return (
    <FormInput
      submittedEmpty={submittedEmpty}
      type="password"
      name="password"
      tabIndex={0}
      autoCorrect="off"
      spellCheck="false"
      autoCapitalize="false"
      placeholder="Enter password"
      autoComplete="current-password"
      {...register('password', { required: true, minLength: 4, maxLength: 24 })}
    />
  );
};

export default PasswordInput;
