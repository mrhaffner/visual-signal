import { useMutation } from '@apollo/client';
import { CREATE_CARD } from '../../../graphql/mutations/board';
import { BoardInterface, ListInterface } from '../../../types';
import { newItemPosition } from '../../../utlities/calculatePositionHelpers';
import { addCardHelper } from '../../../utlities/onDragEndHelpers';
import useMemberContext from '../../useMemberContext';

const useAddCard = (
  board: BoardInterface | null,
  setBoard: (input: BoardInterface) => void,
) => {
  const { setMemberFound } = useMemberContext();

  const [newCardMutation] = useMutation(CREATE_CARD, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const addCard = (input: string, list: ListInterface) => {
    if (!board) return;
    try {
      let cardObject = {
        name: input,
        pos: newItemPosition(list.cards),
        idList: list._id,
        idBoard: board._id,
      };
      newCardMutation({ variables: { createCardInput: cardObject } });
      addCardHelper(board, cardObject, list, setBoard);
    } catch (e) {
      console.log(e);
    }
  };

  return addCard;
};

export default useAddCard;
