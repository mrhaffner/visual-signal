import { useState, useEffect } from 'react';
import { GET_MY_BOARDS } from '../../graphql/queries/all';
import { useQuery } from '@apollo/client';
import { BoardInterface } from '../../types';
import {
  BOARD_UPDATE_SUBSCRIPTION,
  BOARD_DELETED_SUBSCRIPTION,
  REMOVE_FROM_BOARD_SUBSCRIPTION,
  NEW_BOARD,
} from '../../graphql/subscriptions/all';

const useGetUpdateBoards = () => {
  const [boardList, setBoardList] = useState<BoardInterface[]>([]);

  const { loading, error, data, subscribeToMore, refetch } = useQuery(
    GET_MY_BOARDS,
    { fetchPolicy: 'network-only' },
  );

  useEffect(() => {
    if (data) {
      setBoardList(data.getMyBoards);
    }
  }, [data]);

  subscribeToMore({
    document: BOARD_UPDATE_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.boardUpdated) return prev;
      const updatedBoard = subscriptionData.data.boardUpdated;
      const newBoardList = prev.getMyBoards.map((x: any) =>
        x._id === updatedBoard._id ? { ...x, name: updatedBoard.name } : x,
      );
      return Object.assign({}, prev, {
        getMyBoards: newBoardList,
      });
    },
  });

  subscribeToMore({
    document: BOARD_DELETED_SUBSCRIPTION,
    variables: {
      idBoards: boardList.map((x: any) => x._id),
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.boardDeleted) return prev;
      const filtered = prev.getMyBoards.filter((x: any) => {
        return x._id !== subscriptionData.data.boardDeleted;
      });

      return Object.assign({}, prev, {
        getMyBoards: filtered,
      });
    },
  });

  subscribeToMore({
    document: REMOVE_FROM_BOARD_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.removeFromBoard) return prev;

      const filtered = prev.getMyBoards.filter((x: any) => {
        return x._id !== subscriptionData.data.removeFromBoard.boardId;
      });

      return Object.assign({}, prev, {
        getMyBoards: filtered,
      });
    },
  });

  subscribeToMore({
    document: NEW_BOARD,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.newBoard) return prev;

      const board = prev.getMyBoards.filter(
        (x: any) => x._id === subscriptionData.data.newBoard.boardObj._id,
      );
      if (board.length) return prev;
      const newBoardList = [
        ...prev.getMyBoards,
        subscriptionData.data.newBoard.boardObj,
      ];

      return Object.assign({}, prev, {
        getMyBoards: newBoardList,
      });
    },
  });

  return { loading, error, boardList, refetch };
};

export default useGetUpdateBoards;
