import { useMutation } from '@apollo/client';
import { UPDATE_LIST_NAME } from '../../../graphql/mutations/board';
import { BoardInterface } from '../../../types';
import useMemberContext from '../../useMemberContext';

const useNewListName = (board: BoardInterface | null) => {
  const { setMemberFound } = useMemberContext();

  const [updateListNameMutation] = useMutation(UPDATE_LIST_NAME, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const newListName = (updateObject: any) => {
    if (!board) return;
    try {
      const obj = { ...updateObject, idBoard: board._id };

      updateListNameMutation({
        variables: { updateListNameInput: obj },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return newListName;
};

export default useNewListName;
