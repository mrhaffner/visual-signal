import { useMutation, useLazyQuery } from '@apollo/client';
import { useState, ReactNode, useEffect } from 'react';
import {
  CREATE_MEMBER,
  LOGIN,
  UPDATE_MEMBER_BOARDS,
} from '../graphql/mutations/all';
import { GET_MY_MEMBER_INFO } from '../graphql/queries/all';
import { MemberContext } from '../hooks/useMemberContext';

interface Props {
  children: ReactNode;
}

const MemberProvider = ({ children }: Props) => {
  const [member, setMember] = useState(null);
  const [token, setToken] = useState(null);

  const [login, loginData] = useMutation(LOGIN);
  const [signUp, signUpData] = useMutation(CREATE_MEMBER);

  const [getMemberData, memberData] = useLazyQuery(GET_MY_MEMBER_INFO);

  useEffect(() => {
    const token = localStorage.getItem('trello-member-token');
    if (token) {
      getMemberData();
    }
  }, []);

  useEffect(() => {
    if (loginData.data) {
      const token = loginData.data.login.value;
      //@ts-ignore
      setToken(token);
      localStorage.setItem('trello-member-token', token);
    }
  }, [loginData]);

  useEffect(() => {
    if (signUpData.data) {
      const token = signUpData.data.createMember.value;
      //@ts-ignore
      setToken(token);
      localStorage.setItem('trello-member-token', token);
    }
  }, [signUpData]);

  useEffect(() => {
    if (token) {
      //check if token is null and refresh?
      getMemberData();
    }
  }, [token]);

  useEffect(() => {
    if (memberData.data) {
      setMember(memberData.data.getMyMemberInfo);
    }
  }, [memberData]);

  const [updateMemberBoards] = useMutation(UPDATE_MEMBER_BOARDS);

  return (
    <MemberContext.Provider
      value={{
        member,
        setMember,
        login,
        signUp,
        updateMemberBoards,
        memberData,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;
