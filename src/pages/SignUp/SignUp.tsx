import SignInOrUpPage from '../../components/SignInOrUpPage';
import SignUpFormInitial from './SignUpFormInitial';
import SignUpFormFinal from './SignUpFormFinal';
import { useParams } from 'react-router-dom';

const SignUp = () => {
  let { slug }: any = useParams();
  const linkObj = { link: '/login', text: 'Already have an account? Log In' };
  const formTitle = 'Sign up for your account';

  return (
    <SignInOrUpPage
      bottomLink={linkObj}
      formTitle={formTitle}
      form={
        slug === undefined ? (
          <SignUpFormInitial />
        ) : (
          <SignUpFormFinal email={slug} />
        )
      }
    />
  );
};

export default SignUp;
