import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_BOARDS } from '../../graphql/queries/all';
import {
  BOARD_UPDATE_SUBSCRIPTION,
  BOARD_DELETED_SUBSCRIPTION,
  REMOVE_FROM_BOARD_SUBSCRIPTION,
  NEW_BOARD,
} from '../../graphql/subscriptions/all';
import { BoardInterface } from '../../types';
import BoardList from './BoardList';
import styled from 'styled-components';
import CreateBoardModal from './CreateBoardModal';
import useMemberContext from '../../hooks/useMemberContext';

const AllBoards = styled.div`
  /* margin: 40px 16px 0; */
  max-width: 825px;
  min-width: 288px;
  width: 100%;
`;

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 900px) {
    margin: 0 13%;
  }
`;

const BoardsTitle = styled.h3`
  align-items: center;
  color: #5e6c84;
  display: flex;
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  margin: 20px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Boards = () => {
  const { member, setMemberFound } = useMemberContext();

  const { loading, error, data, subscribeToMore, refetch } =
    useQuery(GET_MY_BOARDS);

  // useEffect(() => {
  //   refetch();
  // }, []);

  const [boardList, setBoardList] = useState<BoardInterface[]>([]);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

  subscribeToMore({
    document: BOARD_UPDATE_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.boardUpdated) return prev;
      const updatedBoard = subscriptionData.data.boardUpdated;
      const newBoardList = prev.getMyBoards.map((x: any) =>
        x._id === updatedBoard._id ? { ...x, name: updatedBoard.name } : x,
      );
      return Object.assign({}, prev, {
        getMyBoards: newBoardList, //?
      });
    },
  });

  subscribeToMore({
    document: BOARD_DELETED_SUBSCRIPTION,
    variables: { idBoards: member.idBoards },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.boardDeleted) return prev;
      const filtered = prev.getMyBoards.filter((x: any) => {
        return x._id !== subscriptionData.data.boardDeleted;
      });

      return Object.assign({}, prev, {
        getMyBoards: filtered, //?
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
        getMyBoards: filtered, //?
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
        getMyBoards: newBoardList, //?
      });
    },
  });

  useEffect(() => {
    if (error) {
      setMemberFound(false);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setBoardList(data.getMyBoards);
    }
  }, [data]);

  // if (loading) return <></>;

  // if (error) return <div>Error!</div>;

  return (
    <>
      <Wrapper>
        <AllBoards>
          <BoardsTitle>YOUR BOARDS</BoardsTitle>
          <BoardList
            boardList={boardList}
            setShowCreateBoardModal={setShowCreateBoardModal}
          />
          {showCreateBoardModal && (
            <CreateBoardModal
              setShowCreateBoardModal={setShowCreateBoardModal}
            />
          )}
        </AllBoards>
      </Wrapper>
    </>
  );
};

export default Boards;
