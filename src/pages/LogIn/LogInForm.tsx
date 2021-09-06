import EmailInput from '../../components/EmailInput';
import GreenFormButton from '../../components/GreenFormButton';
import PasswordInput from '../../components/PasswordInput';
import { useForm } from 'react-hook-form';
import useMemberContext from '../../hooks/useMemberContext';
import { useEffect, useState } from 'react';

const LogInForm = () => {
  const [testPassword, setTestPassword] = useState(null);
  const { setMember, getMember, data } = useMemberContext();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (data && data.getMemberByEmail.password === testPassword) {
      setMember(data.getMemberByEmail);
    }
  });

  const onSubmit = (inputData: any) => {
    const { email, password } = inputData;
    setTestPassword(password);
    getMember({ variables: { email } });
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
