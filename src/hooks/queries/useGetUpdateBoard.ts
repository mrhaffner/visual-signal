import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GET_BOARD } from '../../graphql/queries';
import {
  BOARD_UPDATE_SUBSCRIPTION,
  BOARD_DELETED_SUBSCRIPTION,
  REMOVE_FROM_BOARD_SUBSCRIPTION,
} from '../../graphql/subscriptions';
import { BoardInterface } from '../../types';

const useGetUpdateBoard = (id: string) => {
  const [board, setBoard] = useState<BoardInterface | null>(null);

  const { loading, error, data, subscribeToMore } = useQuery(GET_BOARD, {
    variables: { id },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data?.getBoardById) {
      setBoard(data.getBoardById[0]);
    }
  }, [data]);

  let history = useHistory();

  subscribeToMore({
    document: BOARD_UPDATE_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.boardUpdated) return prev;
      const updatedBoard = subscriptionData.data.boardUpdated;

      if (id !== updatedBoard._id) return prev;
      return Object.assign({}, prev, {
        getBoardById: updatedBoard,
      });
    },
  });

  subscribeToMore({
    document: BOARD_DELETED_SUBSCRIPTION,
    variables: { idBoards: [id] },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.boardDeleted) return prev;

      history.push('/boards');
      return Object.assign({}, prev, {
        getBoardById: [],
      });
    },
  });

  subscribeToMore({
    document: REMOVE_FROM_BOARD_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.removeFromBoard) return prev;
      if (subscriptionData.data.removeFromBoard.boardId !== id) return;
      history.push('/boards');

      return Object.assign({}, prev, {
        getBoardById: [],
      });
    },
  });

  return { loading, error, board, setBoard };
};

export default useGetUpdateBoard;
