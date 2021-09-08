import { createContext, useContext } from 'react';

type MemberState = {
  member: any;
  memberData: any;
  setMember: (value: any) => void;
  updateMemberBoards: (value: any) => void;
  login: (value: any) => void;
  signUp: (value: any) => void;
};

export const MemberContext = createContext<MemberState>({
  member: null,
  memberData: null,
  setMember: () => {},
  updateMemberBoards: () => {},
  login: () => {},
  signUp: () => {},
});

const useMemberContext = () => useContext(MemberContext);

export default useMemberContext;
