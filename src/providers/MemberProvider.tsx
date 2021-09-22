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

  const [memberFound, setMemberFound] = useState(null);

  const [getMemberData, { data: memberData, error: memberError }] =
    useLazyQuery(GET_MY_MEMBER_INFO);

  const logOut = () => {
    localStorage.removeItem('trello-member-token');
    setToken(null);
    setMember(null); //
    //@ts-ignore
    setMemberFound(false); //
  };

  useEffect(() => {
    const memberToken = localStorage.getItem('trello-member-token');
    if (memberToken) {
      getMemberData();
    } else {
      //@ts-ignore
      setMemberFound(false); //
    }
  }, []);

  useEffect(() => {
    if (loginData.data) {
      const token = loginData.data.login.value;
      setToken(token);
      localStorage.setItem('trello-member-token', token);
      window.location.reload();
    }
  }, [loginData.data]);

  useEffect(() => {
    if (signUpData.data) {
      const token = signUpData.data.createMember.value;
      setToken(token);
      localStorage.setItem('trello-member-token', token);
      window.location.reload();
      //do i need to add this on logout? probably not
    }
  }, [signUpData.data]);

  useEffect(() => {
    if (token) {
      //check if token is null and refresh?
      getMemberData();
    }
  }, [token]);

  useEffect(() => {
    if (memberData) {
      setMember(memberData.getMyMemberInfo);
      //@ts-ignore
      setMemberFound(true); //
    }
  }, [memberData]);

  useEffect(() => {
    if (memberError) {
      //@ts-ignore
      setMemberFound(false); //
    }
  }, [memberError]);

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
        memberFound,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;
