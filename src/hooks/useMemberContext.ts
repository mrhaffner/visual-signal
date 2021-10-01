import { createContext, useContext } from 'react';

type MemberState = {
  member: any;
  setMember: (value: any) => void;
  updateMemberBoards: (value: any) => void;
  login: (value: any) => void;
  logOut: () => void;
  signUp: (value: any) => void;
  memberFound: any;
  loginData: any;
  setMemberFound: any;
};

export const MemberContext = createContext<MemberState>({
  member: null,
  memberFound: null,
  setMember: () => {},
  updateMemberBoards: () => {},
  login: () => {},
  logOut: () => {},
  signUp: () => {},
  loginData: null,
  setMemberFound: null,
});

const useMemberContext = () => useContext(MemberContext);

export default useMemberContext;
