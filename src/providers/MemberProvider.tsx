import { useMutation, useLazyQuery, Cache } from '@apollo/client';
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

  const logOut = () => {
    localStorage.removeItem('trello-member-token');
    setToken(null);
    setMember(null);
    //@ts-ignore
    memberData.client.resetStore();
    //mutation to invalidate token?
  };

  useEffect(() => {
    const memberToken = localStorage.getItem('trello-member-token');
    if (memberToken) {
      getMemberData();
    }
  }, []);

  useEffect(() => {
    if (loginData.data) {
      const token = loginData.data.login.value;
      setToken(token);
      localStorage.setItem('trello-member-token', token);
    }
  }, [loginData.data]);

  useEffect(() => {
    if (signUpData.data) {
      const token = signUpData.data.createMember.value;
      setToken(token);
      localStorage.setItem('trello-member-token', token);
    }
  }, [signUpData.data]);

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
        logOut,
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
