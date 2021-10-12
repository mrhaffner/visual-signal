import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { VALIDATE_EMAIL } from '../graphql/queries';
import { FormData } from '../types';
import useMemberContext from './useMemberContext';

const useValidateSignUp = () => {
  const [validateEmail, { data, loading }] = useLazyQuery(VALIDATE_EMAIL);
  const [signUpParams, setSignUpParams] = useState<null | FormData>(null);
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

  const onSubmit = (inputData: FormData) => {
    const token = localStorage.getItem('trello-member-token');
    if (token) localStorage.removeItem('trello-member-token');
    const { fullName, email, password } = inputData;
    validateEmail({ variables: { email } });
    setSubmitted(true);
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

  return { handleSubmit, onSubmit, register, errors, showNonUniqueEmailError };
};

export default useValidateSignUp;
