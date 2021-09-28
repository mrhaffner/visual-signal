import EmailInput from '../../components/Inputs/EmailInput';
import GreenFormButton from '../../components/Buttons/GreenFormButton';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLazyQuery } from '@apollo/client';
import { VALIDATE_EMAIL } from '../../graphql/queries/all';
import { TOS } from './sharedStyle';

interface Props {
  setEmailInUse: (input: boolean) => void;
  setEmail: (input: string) => void;
}

const SignUpFormInitial = ({ setEmailInUse, setEmail }: any) => {
  const [validateEmail, { data }] = useLazyQuery(VALIDATE_EMAIL);

  const { register, handleSubmit, watch } = useForm();
  const watchEmail = watch('email');

  const [disabled, setDisabled] = useState(true);

  const onSubmit = (data: any) => {
    const { email } = data;
    validateEmail({ variables: { email } });
  };

  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;

  useEffect(() => {
    if (regex.test(watchEmail) === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [watchEmail]);

  useEffect(() => {
    if (data && data.validateEmail === false) {
      setEmailInUse(true);
    } else if (data && data.validateEmail === true) {
      setEmailInUse(false);
      setEmail(watchEmail);
    }
  }, [data]);

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
