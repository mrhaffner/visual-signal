import { useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_MY_MEMBER_INFO } from '../../graphql/queries';

const useGetMember = () => {
  const [member, setMember] = useState(null);
  const [memberFound, setMemberFound] = useState<boolean | null>(null);

  const [getMemberData, { data, error }] = useLazyQuery(GET_MY_MEMBER_INFO);

  useEffect(() => {
    if (data) {
      setMember(data.getMyMemberInfo);
      if (data.getMyMemberInfo) setMemberFound(true);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      localStorage.removeItem('trello-member-token');
      setMemberFound(false);
    }
  }, [error]);

  return { member, setMember, memberFound, setMemberFound, getMemberData };
};

export default useGetMember;
