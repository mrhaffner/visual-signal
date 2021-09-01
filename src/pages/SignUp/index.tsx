import SignInOrUpPage from '../../components/SignInOrUpPage';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  const linkObj = { link: '/login', text: 'Already have an account? Log In' };
  const formTitle = 'Sign up for your account';

  return (
    <SignInOrUpPage
      bottomLink={linkObj}
      formTitle={formTitle}
      form={<SignUpForm />}
    />
  );
};

export default SignUp;
