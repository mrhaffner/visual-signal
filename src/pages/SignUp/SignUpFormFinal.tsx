import EmailInput from '../../components/Inputs/EmailInput';
import { useForm } from 'react-hook-form';
import NameInput from '../../components/Inputs/NameInput';
import BlueFormButton from '../../components/Buttons/BlueFormButton';
import PasswordRegisterInput from '../../components/Inputs/PasswordRegisterInput';
import useMemberContext from '../../hooks/useMemberContext';
import InputErrorField from '../../components/Inputs/InputErrorField';
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { VALIDATE_EMAIL } from '../../graphql/queries';
import { TOS } from './sharedStyles';

interface Props {
  email: string;
}

const SignUpFormFinal = ({ email }: Props) => {
  const [validateEmail, { data, loading }] = useLazyQuery(VALIDATE_EMAIL);
  const [signUpParams, setSignUpParams] = useState(null);
  const [showNonUniqueEmailError, setShowNonUniqueEmailError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { signUp } = useMemberContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onChange',
  });

  const onSubmit = (inputData: any) => {
    const token = localStorage.getItem('trello-member-token');
    if (token) localStorage.removeItem('trello-member-token');
    const { fullName, email, password } = inputData;
    validateEmail({ variables: { email } });
    setSubmitted(true);
    //@ts-ignore
    setSignUpParams({ fullName, email, password });
  };

  useEffect(() => {
    if (data && data.validateEmail) {
      signUp({ variables: { memberInput: signUpParams } });
    }
  }, [data]);

  useEffect(() => {
    if (data && data.validateEmail === false && !loading) {
      setShowNonUniqueEmailError(true);
      setSubmitted(false);
    }
  }, [data, submitted, loading]);

  useEffect(() => {
    if (errors.email) {
      setShowNonUniqueEmailError(false);
    }
  }, [errors.email]);

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
