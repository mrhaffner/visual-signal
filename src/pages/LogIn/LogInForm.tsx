import EmailInput from '../../components/Inputs/EmailInput';
import GreenFormButton from '../../components/Buttons/GreenFormButton';
import PasswordInput from '../../components/Inputs/PasswordInput';
import { useForm } from 'react-hook-form';
import useMemberContext from '../../hooks/useMemberContext';
import InputErrorField from '../../components/Inputs/InputErrorField';

const LogInForm = () => {
  const { login, loginData } = useMemberContext();
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
    login({ variables: { loginInput: inputData } });
  };
  console.log(errors.password);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput
        autoFocus={true}
        register={register}
        submittedEmpty={errors.email ? true : false}
      />
      {errors.email && <InputErrorField text="Please enter an email address" />}
      <PasswordInput
        register={register}
        submittedEmpty={errors.password ? true : false}
      />
      {errors.password?.type === 'required' && loginData?.login !== null && (
        <InputErrorField text="Please enter a password" />
      )}
      {loginData?.login === null && (
        <InputErrorField text="Invalid credentials" />
      )}

      <GreenFormButton value="Log in" disabled={false} />
    </form>
  );
};

export default LogInForm;
