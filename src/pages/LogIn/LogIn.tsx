import SignInOrUpPage from '../../components/SharedLayouts/SignInOrUpPage';
import { formTitle, linkObj } from '../../constants/login';
import LogInForm from './LogInForm';

const LogIn = () => (
  <SignInOrUpPage
    bottomLink={linkObj}
    formTitle={formTitle}
    form={<LogInForm />}
  />
);

export default LogIn;
