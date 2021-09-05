import { useState, ReactNode } from 'react';
import { MemberContext } from '../hooks/useMemberContext';

interface Props {
  children: ReactNode;
}

const MemberProvider = ({ children }: Props) => {
  const [member, setMember] = useState(null);

  return (
    <MemberContext.Provider value={{ member, setMember }}>
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;
