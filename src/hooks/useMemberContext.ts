import { createContext, useContext } from 'react';

type MemberState = {
  member: any;
  setMember: (value: any) => void;
  getMember: (value: any) => void;
  createMember: (value: any) => void;
  updateMemberBoards: (value: any) => void;
};

export const MemberContext = createContext<MemberState>({
  member: null,
  setMember: () => {},
  getMember: () => {},
  createMember: () => {},
  updateMemberBoards: () => {},
});

const useMemberContext = () => useContext(MemberContext);

export default useMemberContext;
