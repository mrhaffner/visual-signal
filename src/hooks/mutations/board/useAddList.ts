import { useMutation } from '@apollo/client';
import { CREATE_LIST } from '../../../graphql/mutations/board';
import { BoardInterface } from '../../../types';
import { newItemPosition } from '../../../utlities/calculatePositionHelpers';
import useMemberContext from '../../useMemberContext';

const useAddList = (board: BoardInterface | null) => {
  const { setMemberFound } = useMemberContext();

  const [newListMutation] = useMutation(CREATE_LIST, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const addList = (input: string) => {
    if (!board) return;
    try {
      const listObject = {
        name: input,
        pos: newItemPosition(board.lists),
        idBoard: board._id,
      };
      newListMutation({ variables: { createListInput: listObject } });
    } catch (e) {
      console.log(e);
    }
  };

  return addList;
};

export default useAddList;
