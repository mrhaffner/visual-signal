import useMemberContext from '../useMemberContext';
import { useMutation } from '@apollo/client';
import { UPDATE_MEMBER_LEVEL_BOARD } from '../../graphql/mutations/all';

const useMutateUpdateMemberLevel = () => {
  const { setMemberFound } = useMemberContext();
  const [updateMemberLevel] = useMutation(UPDATE_MEMBER_LEVEL_BOARD, {
    onError: () => {
      setMemberFound(false);
    },
  });

  return updateMemberLevel;
};

export default useMutateUpdateMemberLevel;
