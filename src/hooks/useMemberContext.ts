import { createContext, useContext } from 'react';

type MemberState = {
  member: any;
  setMember: (value: any) => void;
};

export const MemberContext = createContext<MemberState>({
  member: null,
  setMember: () => {},
});

const useMemberContext = () => useContext(MemberContext);

export default useMemberContext;
