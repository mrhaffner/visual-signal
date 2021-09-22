import { createContext, useContext } from 'react';

type MemberState = {
  member: any;
  memberData: any;
  setMember: (value: any) => void;
  updateMemberBoards: (value: any) => void;
  login: (value: any) => void;
  logOut: () => void;
  signUp: (value: any) => void;
  memberFound: any;
};

export const MemberContext = createContext<MemberState>({
  member: null,
  memberData: null,
  memberFound: null,
  setMember: () => {},
  updateMemberBoards: () => {},
  login: () => {},
  logOut: () => {},
  signUp: () => {},
});

const useMemberContext = () => useContext(MemberContext);

export default useMemberContext;
