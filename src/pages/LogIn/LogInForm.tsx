import EmailInput from '../../components/EmailInput';
import GreenFormButton from '../../components/GreenFormButton';
import PasswordInput from '../../components/PasswordInput';
import { useForm } from 'react-hook-form';

const LogInForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
