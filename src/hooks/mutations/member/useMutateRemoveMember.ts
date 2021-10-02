import useMemberContext from '../../useMemberContext';
import { useMutation } from '@apollo/client';
import { REMOVE_MEMBER_FROM_BOARD } from '../../../graphql/mutations/all';

const useMutateRemoveMember = () => {
  const { setMemberFound } = useMemberContext();

  const [removeMember] = useMutation(REMOVE_MEMBER_FROM_BOARD, {
    onError: () => {
      setMemberFound(false);
    },
  });

  return removeMember;
};

export default useMutateRemoveMember;
