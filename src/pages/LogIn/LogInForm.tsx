import styled from 'styled-components';
import EmailInput from '../../components/EmailInput';
import LogSignFormButton from '../../components/LogSignFormButton';
import PasswordInput from '../../components/PasswordInput';

const LogInForm = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <EmailInput autoFocus={true} />
      <PasswordInput />
      <LogSignFormButton value="Log in" />
    </form>
  );
};

export default LogInForm;
