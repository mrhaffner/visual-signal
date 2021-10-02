import { useMutation } from '@apollo/client';
import { useState, ReactNode, useEffect } from 'react';
import {
  CREATE_MEMBER,
  LOGIN,
  UPDATE_MEMBER_BOARDS,
} from '../graphql/mutations/all';
import useGetMember from '../hooks/queries/useGetMember';
import { MemberContext } from '../hooks/useMemberContext';

interface Props {
  children: ReactNode;
}

const MemberProvider = ({ children }: Props) => {
  const [token, setToken] = useState(null);
  const { member, setMember, memberFound, setMemberFound, getMemberData } =
    useGetMember();

  const [login, { data: loginData }] = useMutation(LOGIN);
  const [signUp, signUpData] = useMutation(CREATE_MEMBER);
  const [updateMemberBoards] = useMutation(UPDATE_MEMBER_BOARDS);

  const logOut = () => {
    localStorage.removeItem('trello-member-token');
    setToken(null);
    setMember(null);
    setMemberFound(false);
  };

  useEffect(() => {
    const memberToken = localStorage.getItem('trello-member-token');
    if (memberToken) {
      getMemberData();
    } else {
      setMemberFound(false);
    }
  }, []);

  useEffect(() => {
    if (loginData?.login) {
      const token = loginData.login.value;
      setToken(token);
      localStorage.setItem('trello-member-token', token);
      window.location.reload();
    }
  }, [loginData]);

  useEffect(() => {
    if (signUpData.data) {
      const token = signUpData.data.createMember.value;
      setToken(token);
      localStorage.setItem('trello-member-token', token);
      window.location.reload();
    }
  }, [signUpData.data]);

  useEffect(() => {
    if (token) {
      getMemberData();
    }
  }, [token]);

  return (
    <MemberContext.Provider
      value={{
        member,
        setMember,
        login,
        logOut,
        signUp,
        updateMemberBoards,
        memberFound,
        loginData,
        setMemberFound,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;
