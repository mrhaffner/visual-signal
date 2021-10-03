import { useMutation } from '@apollo/client';
import { UPDATE_CARD_POS } from '../../../graphql/mutations/all';
import useMemberContext from '../../useMemberContext';

const useUpdateCardPos = () => {
  const { setMemberFound } = useMemberContext();

  const [updateCardPosMutation] = useMutation(UPDATE_CARD_POS, {
    onError: () => {
      setMemberFound(false);
    },
  });

  return updateCardPosMutation;
};

export default useUpdateCardPos;
