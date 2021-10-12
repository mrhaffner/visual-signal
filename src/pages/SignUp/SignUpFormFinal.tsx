import EmailInput from '../../components/Inputs/EmailInput';
import NameInput from '../../components/Inputs/NameInput';
import BlueFormButton from '../../components/Buttons/BlueFormButton';
import PasswordRegisterInput from '../../components/Inputs/PasswordRegisterInput';
import InputErrorField from '../../components/Inputs/InputErrorField';
import { TOS } from './sharedStyles';
import useValidateSignUp from '../../hooks/useValidateSignUp';

interface Props {
  email: string;
}

const SignUpFormFinal = ({ email }: Props) => {
  const { handleSubmit, onSubmit, register, errors, showNonUniqueEmailError } =
    useValidateSignUp();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput
        autoFocus={false}
        register={register}
        email={email}
        submittedEmpty={errors.email ? true : false}
      />
      {showNonUniqueEmailError && (
        <InputErrorField text="Email address already in use" />
      )}
      {errors.email && <InputErrorField text="Please enter an email address" />}
      <NameInput
        autoFocus={true}
        register={register}
        submittedEmpty={errors.fullName ? true : false}
      />
      {errors.fullName && <InputErrorField text="Please enter a name" />}
      <PasswordRegisterInput
        register={register}
        submittedEmpty={errors.password ? true : false}
      />
      {errors.password && <InputErrorField text="Please enter a password" />}
      <TOS>
        By signing up, you confirm that you've read and accepted our Terms of
        Service and Privacy Policy.
      </TOS>
      <BlueFormButton />
    </form>
  );
};

export default SignUpFormFinal;
