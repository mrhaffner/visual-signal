import { useLazyQuery, useMutation } from '@apollo/client';
import { useState, ReactNode, useEffect } from 'react';
import { UPDATE_MEMBER_BOARDS } from '../graphql/mutations/all';
import { GET_MEMBER_BY_EMAIL } from '../graphql/queries/all';
import { MemberContext } from '../hooks/useMemberContext';

interface Props {
  children: ReactNode;
}

const MemberProvider = ({ children }: Props) => {
  const [member, setMember] = useState(null);

  const [getMember, { called, loading, data, error }] =
    useLazyQuery(GET_MEMBER_BY_EMAIL);

  const [updateMemberBoards] = useMutation(UPDATE_MEMBER_BOARDS);

  return (
    <MemberContext.Provider
      value={{
        member,
        setMember,
        getMember,
        updateMemberBoards,
        data,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;
