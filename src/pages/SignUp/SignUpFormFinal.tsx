import styled from 'styled-components';
import EmailInput from '../../components/EmailInput';
import { useForm } from 'react-hook-form';
import NameInput from '../../components/NameInput';
import BlueFormButton from '../../components/BlueFormButton';
import PasswordRegisterInput from '../../components/PasswordRegisterInput';
import useMemberContext from '../../hooks/useMemberContext';
import { useEffect } from 'react';
import { CREATE_MEMBER } from '../../graphql/mutations/all';
import { useMutation } from '@apollo/client';

const TOS = styled.p`
  /* margin-top: 20px; */
  margin-bottom: 20px;
  font-size: 12px;
  line-height: 16px;
  color: #5e6c84;
  font-weight: 300;
`;

const SignUpFormFinal = ({ email }: any) => {
  const { setMember } = useMemberContext();
  const { register, handleSubmit } = useForm();
  const [createMember, { called, loading, data, error }] =
    useMutation(CREATE_MEMBER);

  useEffect(() => {
    if (data) {
      console.log('useEffect', data);
      setMember(data);
    }
  });

  const onSubmit = (inputData: any) => {
    const { fullName, email, password } = inputData;
    const memberObject = { fullName, email, password };
    createMember({ variables: { memberInput: memberObject } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput autoFocus={false} register={register} email={email} />
      <NameInput autoFocus={true} register={register} />
      <PasswordRegisterInput register={register} />
      <TOS>
        By signing up, you confirm that you've read and accepted our Terms of
        Service and Privacy Policy.
      </TOS>
      <BlueFormButton />
    </form>
  );
};

export default SignUpFormFinal;
