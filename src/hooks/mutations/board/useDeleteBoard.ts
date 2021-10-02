import { useMutation } from '@apollo/client';
import useMemberContext from '../../useMemberContext';
import { DELETE_BOARD } from '../../../graphql/mutations/all';
import { useHistory } from 'react-router';

const useDeleteBoard = () => {
  const { setMemberFound } = useMemberContext();
  let history = useHistory();

  const [deleteBoardMutation] = useMutation(DELETE_BOARD, {
    onError: () => {
      setMemberFound(false);
    },
  });

  const deleteBoard = (id: string) => {
    deleteBoardMutation({
      variables: { boardId: id },
    });
    history.push('/boards');
  };

  return deleteBoard;
};

export default useDeleteBoard;
