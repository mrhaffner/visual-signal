import styled from 'styled-components';
import EmailInput from '../../components/EmailInput';
import LogSignFormButton from '../../components/LogSignFormButton';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const TOS = styled.p`
  /* margin-top: 20px; */
  margin-bottom: 20px;
  font-size: 12px;
  line-height: 16px;
  color: #5e6c84;
  font-weight: 300;
`;

const SignUpForm = () => {
  const { register, handleSubmit } = useForm();
  const [disabled, setDisabled] = useState(true);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput autoFocus={false} register={register} />
      <TOS>
        By signing up, you confirm that you've read and accepted our Terms of
        Service and Privacy Policy.
      </TOS>
      <LogSignFormButton value="Continue" disabled={disabled} />
    </form>
  );
};

export default SignUpForm;
