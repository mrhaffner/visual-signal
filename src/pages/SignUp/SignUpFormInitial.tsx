import EmailInput from '../../components/Inputs/EmailInput';
import GreenFormButton from '../../components/Buttons/GreenFormButton';
import { TOS } from './sharedStyles';
import { EmailInUse, SetEmail } from '../../types';
import useValidateEmail from '../../hooks/useValidateEmail';

interface Props {
  setEmailInUse: EmailInUse;
  setEmail: SetEmail;
}

const SignUpFormInitial = ({ setEmailInUse, setEmail }: Props) => {
  const { handleSubmit, onSubmit, register, disabled } = useValidateEmail(
    setEmailInUse,
    setEmail,
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput autoFocus={false} register={register} email="" />
      <TOS>
        By signing up, you confirm that you've read and accepted our Terms of
        Service and Privacy Policy.
      </TOS>
      <GreenFormButton value="Continue" disabled={disabled} />
    </form>
  );
};

export default SignUpFormInitial;
