import styled from 'styled-components';
import EmailInput from '../../components/EmailInput';
import LogSignFormButton from '../../components/LogSignFormButton';
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
      <LogSignFormButton value="Log in" />
    </form>
  );
};

export default LogInForm;
