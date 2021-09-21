import styled from 'styled-components';
import EmailInput from '../../components/Inputs/EmailInput';
import GreenFormButton from '../../components/Buttons/GreenFormButton';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { VALIDATE_EMAIL } from '../../graphql/queries/all';
import InputErrorField from '../../components/Inputs/InputErrorField';

const TOS = styled.p`
  /* margin-top: 20px; */
  margin-bottom: 20px;
  font-size: 12px;
  line-height: 16px;
  color: #5e6c84;
  font-weight: 300;
`;

const SignUpFormInitial = () => {
  const [validateEmail, { data }] = useLazyQuery(VALIDATE_EMAIL);
  const [email, setEmail] = useState(null);

  const { register, handleSubmit, watch } = useForm();
  const watchEmail = watch('email');

  const [disabled, setDisabled] = useState(true);
  let history = useHistory();

  const onSubmit = (data: any) => {
    const { email } = data;
    validateEmail({ variables: { email } });
    setEmail(email);
  };

  useEffect(() => {
    if (data && data.validateEmail) {
      console.log(data);
      console.log(data.validateEmail);
      console.log(data && data.validateEmail === false);
      history.push(`/${email}`);
    }
  }, [data]);

  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;

  useEffect(() => {
    if (regex.test(watchEmail) === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [watchEmail]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput autoFocus={false} register={register} email="" />
      {data && data.validateEmail === false && (
        <InputErrorField text="Email address already in use" />
      )}
      <TOS>
        By signing up, you confirm that you've read and accepted our Terms of
        Service and Privacy Policy.
      </TOS>
      <GreenFormButton value="Continue" disabled={disabled} />
    </form>
  );
};

export default SignUpFormInitial;
