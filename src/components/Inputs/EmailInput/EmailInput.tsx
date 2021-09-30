import { FormInput } from './style';

const EmailInput = ({ register, autoFocus, email, submittedEmpty }: any) => {
  return (
    <FormInput
      submittedEmpty={submittedEmpty}
      type="email"
      name="email"
      tabIndex={0}
      autoCorrect="off"
      spellCheck="false"
      autoCapitalize="false"
      placeholder="Enter email"
      autoComplete="username email"
      autoFocus={autoFocus}
      defaultValue={email}
      {...register('email', {
        required: true,
        pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i,
      })}
    />
  );
};

export default EmailInput;
