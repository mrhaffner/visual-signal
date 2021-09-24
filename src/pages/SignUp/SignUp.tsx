import SignInOrUpPage from '../../components/SignInOrUpPage';
import SignUpFormInitial from './SignUpFormInitial';
import SignUpFormFinal from './SignUpFormFinal';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {
  let { slug }: any = useParams();
  const linkObj = { link: '/login', text: 'Already have an account? Log In' };
  const formTitle = 'Sign up for your account';
  const [emailInUse, setEmailInUse] = useState(false);

  return (
    <SignInOrUpPage
      bottomLink={linkObj}
      formTitle={formTitle}
      form={
        slug === undefined ? (
          <SignUpFormInitial setEmailInUse={setEmailInUse} />
        ) : (
          <SignUpFormFinal email={slug} />
        )
      }
      emailInUse={emailInUse}
    />
  );
};

export default SignUp;
