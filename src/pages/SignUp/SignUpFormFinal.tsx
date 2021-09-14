import styled from 'styled-components';
import EmailInput from '../../components/Inputs/EmailInput';
import { useForm } from 'react-hook-form';
import NameInput from '../../components/Inputs/NameInput';
import BlueFormButton from '../../components/Buttons/BlueFormButton';
import PasswordRegisterInput from '../../components/Inputs/PasswordRegisterInput';
import useMemberContext from '../../hooks/useMemberContext';

const TOS = styled.p`
  /* margin-top: 20px; */
  margin-bottom: 20px;
  font-size: 12px;
  line-height: 16px;
  color: #5e6c84;
  font-weight: 300;
`;

const SignUpFormFinal = ({ email }: any) => {
  const { signUp } = useMemberContext();
  const { register, handleSubmit } = useForm();

  const onSubmit = (inputData: any) => {
    const { fullName, email, password } = inputData;
    const memberObject = { fullName, email, password };
    signUp({ variables: { memberInput: memberObject } });
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
