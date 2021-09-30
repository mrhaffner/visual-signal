import SignInOrUpPage from '../../components/SharedLayouts/SignInOrUpPage';
import SignUpFormInitial from './SignUpFormInitial';
import SignUpFormFinal from './SignUpFormFinal';
import { useState } from 'react';

const SignUp = () => {
  const linkObj = { link: '/login', text: 'Already have an account? Log In' };
  const formTitle = 'Sign up for your account';
  const [emailInUse, setEmailInUse] = useState(null);
  const [email, setEmail] = useState(null);

  return (
    <SignInOrUpPage
      bottomLink={linkObj}
      formTitle={formTitle}
      form={
        email ? (
          <SignUpFormFinal email={email} />
        ) : (
          <SignUpFormInitial
            setEmailInUse={setEmailInUse}
            setEmail={setEmail}
          />
        )
      }
      emailInUse={emailInUse}
    />
  );
};

export default SignUp;
