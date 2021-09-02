import styled from 'styled-components';
import EmailInput from '../../components/EmailInput';
import GreenFormButton from '../../components/GreenFormButton';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const TOS = styled.p`
  /* margin-top: 20px; */
  margin-bottom: 20px;
  font-size: 12px;
  line-height: 16px;
  color: #5e6c84;
  font-weight: 300;
`;

const SignUpFormInitial = () => {
  const { register, handleSubmit, watch } = useForm();
  const watchEmail = watch('email');

  const [disabled, setDisabled] = useState(true);
  let history = useHistory();

  const onSubmit = (data: any) => {
    console.log(data);
    history.push(`/${data.email}`);
  };

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
      <TOS>
        By signing up, you confirm that you've read and accepted our Terms of
        Service and Privacy Policy.
      </TOS>
      <GreenFormButton value="Continue" disabled={disabled} />
    </form>
  );
};

export default SignUpFormInitial;
