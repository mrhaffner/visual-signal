import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_BOARDS } from '../../graphql/queries/all';
import {
  BOARD_UPDATE_SUBSCRIPTION,
  BOARD_LIST_SUBSCRIPTION,
  BOARD_DELETED_SUBSCRIPTION,
} from '../../graphql/subscriptions/all';
import { BoardInterface } from '../../types';
import BoardList from './BoardList';
import styled from 'styled-components';
import CreateBoardModal from './CreateBoardModal';
import NavBar from '../../components/NavBar';
import useMemberContext from '../../hooks/useMemberContext';
import MemberMenuPopover from '../../components/Popovers/MemberMenuPopover';
import useToggle from '../../hooks/useToggle';

const AllBoards = styled.div`
  /* margin: 40px 16px 0; */
  max-width: 825px;
  min-width: 288px;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
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
  const { member, logOut } = useMemberContext();
  const [showMenuPopover, toggleMenuPopover] = useToggle();

  const { loading, error, data, subscribeToMore } = useQuery(GET_MY_BOARDS);

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

  //can get rid of ??
  subscribeToMore({
    document: BOARD_LIST_SUBSCRIPTION,
    variables: { memberId: member._id },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.newBoardList) return prev;
      const newBoardList = subscriptionData.data.newBoardList;

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
      const filtered = prev.getMyBoards.filter(
        (x: any) => x._id !== subscriptionData.data.boardDeleted,
      );
      return Object.assign({}, prev, {
        getMyBoards: filtered, //?
      });
    },
  });

  useEffect(() => {
    if (data) {
      setBoardList(data.getMyBoards);
    }
  }, [data]);

  if (loading) return <></>;
  if (error) return <div>Error!</div>;

  return (
    <>
      <NavBar
        setBlue={true}
        isLoading={loading}
        toggleMenuPopover={toggleMenuPopover}
      />
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
      <MemberMenuPopover
        logOut={logOut}
        showPopover={showMenuPopover}
        togglePopover={toggleMenuPopover}
        initials={member.initials}
        name={member.fullName}
        email={member.email}
      />
    </>
  );
};

export default Boards;
