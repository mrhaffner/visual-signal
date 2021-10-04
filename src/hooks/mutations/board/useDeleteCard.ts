import { useMutation } from '@apollo/client';
import { DELETE_CARD } from '../../../graphql/mutations/board';
import { BoardInterface } from '../../../types';
import useMemberContext from '../../useMemberContext';

const useDeleteCard = (board: BoardInterface | null) => {
  const { setMemberFound } = useMemberContext();

  const [deleteCardMutation] = useMutation(DELETE_CARD, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const deleteCard = (cardId: string) => {
    if (!board) return;
    try {
      const deleteObject = {
        _id: cardId,
        idBoard: board._id,
      };
      deleteCardMutation({ variables: { deleteCardInput: deleteObject } });
    } catch (e) {
      console.log(e);
    }
  };

  return deleteCard;
};

export default useDeleteCard;
