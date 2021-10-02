import { useMutation } from '@apollo/client';
import { DELETE_LIST } from '../../../graphql/mutations/all';
import { BoardInterface } from '../../../types';
import useMemberContext from '../../useMemberContext';

const useDeleteList = (board: BoardInterface | null) => {
  const { setMemberFound } = useMemberContext();

  const [deleteListMutation] = useMutation(DELETE_LIST, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const deleteList = (idList: string) => {
    if (!board) return;
    try {
      const deleteObject = {
        _id: idList,
        idBoard: board._id,
      };
      deleteListMutation({ variables: { deleteListInput: deleteObject } });
    } catch (e) {
      console.log(e);
    }
  };

  return deleteList;
};

export default useDeleteList;
