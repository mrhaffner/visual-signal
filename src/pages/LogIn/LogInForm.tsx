import EmailInput from '../../components/EmailInput';
import GreenFormButton from '../../components/GreenFormButton';
import PasswordInput from '../../components/PasswordInput';
import { useForm } from 'react-hook-form';
import useMemberContext from '../../hooks/useMemberContext';

const LogInForm = () => {
  const { login } = useMemberContext();
  const { register, handleSubmit } = useForm();

  const onSubmit = (inputData: any) => {
    login({ variables: { loginInput: inputData } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput autoFocus={true} register={register} />
      <PasswordInput register={register} />
      <GreenFormButton value="Log in" disabled={false} />
    </form>
  );
};

export default LogInForm;
