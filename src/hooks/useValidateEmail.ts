import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { emailRegex } from '../constants/regex';
import { VALIDATE_EMAIL } from '../graphql/queries';
import { EmailInUse, FormData, SetEmail } from '../types';

const useValidateEmail = (setEmailInUse: EmailInUse, setEmail: SetEmail) => {
  const [validateEmail, { data }] = useLazyQuery(VALIDATE_EMAIL);

  const { register, handleSubmit, watch } = useForm();
  const watchEmail = watch('email');

  const [disabled, setDisabled] = useState(true);

  const onSubmit = (data: FormData) => {
    const { email } = data;
    validateEmail({ variables: { email } });
  };

  useEffect(() => {
    if (emailRegex.test(watchEmail) === true) {
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

  return { handleSubmit, onSubmit, register, disabled };
};

export default useValidateEmail;
