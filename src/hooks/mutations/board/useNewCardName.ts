import { useMutation } from '@apollo/client';
import { UPDATE_CARD_NAME } from '../../../graphql/mutations/board';
import { BoardInterface } from '../../../types';
import useMemberContext from '../../useMemberContext';

const useNewCardName = (board: BoardInterface | null) => {
  const { setMemberFound } = useMemberContext();

  const [updateCardNameMutation] = useMutation(UPDATE_CARD_NAME, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const newCardName = (updateObject: any) => {
    if (!board) return;
    try {
      const obj = { ...updateObject, idBoard: board._id };
      updateCardNameMutation({
        variables: { updateCardNameInput: obj },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return newCardName;
};

export default useNewCardName;
