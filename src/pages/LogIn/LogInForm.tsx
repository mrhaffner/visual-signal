import EmailInput from '../../components/Inputs/EmailInput';
import GreenFormButton from '../../components/Buttons/GreenFormButton';
import PasswordInput from '../../components/Inputs/PasswordInput';
import { useForm } from 'react-hook-form';
import useMemberContext from '../../hooks/useMemberContext';

const LogInForm = () => {
  const { login } = useMemberContext();
  const { register, handleSubmit } = useForm();

  const onSubmit = (inputData: any) => {
    const token = localStorage.getItem('trello-member-token');
    if (token) localStorage.removeItem('trello-member-token');
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
