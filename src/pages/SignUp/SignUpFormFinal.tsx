import styled from 'styled-components';
import EmailInput from '../../components/EmailInput';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import NameInput from '../../components/NameInput';
import BlueFormButton from '../../components/BlueFormButton';
import PasswordRegisterInput from '../../components/PasswordRegisterInput';

const TOS = styled.p`
  /* margin-top: 20px; */
  margin-bottom: 20px;
  font-size: 12px;
  line-height: 16px;
  color: #5e6c84;
  font-weight: 300;
`;

const SignUpFormFinal = ({ email }: any) => {
  const { register, handleSubmit } = useForm();
  let history = useHistory();

  const onSubmit = (data: any) => {
    console.log(data);
    // history.push(`${data.email}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput autoFocus={false} register={register} email={email} />
      <NameInput autoFocus={true} register={register} />
      <PasswordRegisterInput register={register} />
      <TOS>
        By signing up, you confirm that you've read and accepted our Terms of
        Service and Privacy Policy.
      </TOS>
      <BlueFormButton />
    </form>
  );
};

export default SignUpFormFinal;
