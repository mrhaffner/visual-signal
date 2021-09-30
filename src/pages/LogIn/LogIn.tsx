import SignInOrUpPage from '../../components/SharedLayouts/SignInOrUpPage';
import LogInForm from './LogInForm';

const LogIn = () => {
  const linkObj = { link: '/', text: 'Sign up for an account' };
  const formTitle = 'Log in to Trello';

  return (
    <SignInOrUpPage
      bottomLink={linkObj}
      formTitle={formTitle}
      form={<LogInForm />}
    />
  );
};

export default LogIn;
