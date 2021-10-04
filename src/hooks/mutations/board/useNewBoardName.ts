import { useMutation } from '@apollo/client';
import { UPDATE_BOARD_NAME } from '../../../graphql/mutations/board';
import { BoardInterface } from '../../../types';
import useMemberContext from '../../useMemberContext';

const useNewBoardName = (
  board: BoardInterface | null,
  setBoard: (input: BoardInterface) => void,
) => {
  const { setMemberFound } = useMemberContext();

  const [updateBoardNameMutation] = useMutation(UPDATE_BOARD_NAME, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const newBoardName = (input: string) => {
    if (!board) return;
    try {
      const updateObject = {
        _id: board._id,
        name: input,
      };
      updateBoardNameMutation({
        variables: { updateBoardInput: updateObject },
      });
      setBoard({ ...board, name: input });
    } catch (e) {
      console.log(e);
    }
  };

  return newBoardName;
};

export default useNewBoardName;
