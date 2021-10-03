import { useMutation } from '@apollo/client';
import { UPDATE_LIST_POS } from '../../../graphql/mutations/all';
import useMemberContext from '../../useMemberContext';

const useUpdateListPos = () => {
  const { setMemberFound } = useMemberContext();

  const [updateListPosMutation] = useMutation(UPDATE_LIST_POS, {
    onError: () => {
      setMemberFound(false);
    },
  });

  return updateListPosMutation;
};

export default useUpdateListPos;
