import styled from 'styled-components';
import EmailInput from '../../components/Inputs/EmailInput';
import { useForm } from 'react-hook-form';
import NameInput from '../../components/Inputs/NameInput';
import BlueFormButton from '../../components/Buttons/BlueFormButton';
import PasswordRegisterInput from '../../components/Inputs/PasswordRegisterInput';
import useMemberContext from '../../hooks/useMemberContext';
import InputErrorField from '../../components/Inputs/InputErrorField';

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
    const memberObject = { fullName, email, password };
    signUp({ variables: { memberInput: memberObject } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput
        autoFocus={false}
        register={register}
        email={email}
        submittedEmpty={errors.email ? true : false}
      />
      {errors.email && <InputErrorField type="an email address" />}
      <NameInput
        autoFocus={true}
        register={register}
        submittedEmpty={errors.fullName ? true : false}
      />
      {errors.fullName && <InputErrorField type="a name" />}
      <PasswordRegisterInput
        register={register}
        submittedEmpty={errors.password ? true : false}
      />
      {errors.password && <InputErrorField type="a password" />}
      <TOS>
        By signing up, you confirm that you've read and accepted our Terms of
        Service and Privacy Policy.
      </TOS>
      <BlueFormButton />
    </form>
  );
};

export default SignUpFormFinal;
