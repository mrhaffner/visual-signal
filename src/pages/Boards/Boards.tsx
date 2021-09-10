import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_BOARDS } from '../../graphql/queries/all';
import { BOARD_LIST_SUBSCRIPTION } from '../../graphql/subscriptions/all';
import { BoardInterface } from '../../types';
import BoardList from './BoardList';
import styled from 'styled-components';
import CreateBoardModal from './CreateBoardModal';
import NavBar from '../../components/NavBar';
import useMemberContext from '../../hooks/useMemberContext';
import MemberMenuPopover from '../../components/MemberMenuPopover';

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
  const [showMenuPopover, setShowMenuPopover] = useState(false);

  const { loading, error, data, subscribeToMore } = useQuery(GET_MY_BOARDS);

  subscribeToMore({
    document: BOARD_LIST_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data.newBoardList) return prev;
      const newBoardList = subscriptionData.data.newBoardList;

      return Object.assign({}, prev, {
        getMemberBoards: newBoardList, //?
      });
    },
  });
  const [boardList, setBoardList] = useState<BoardInterface[]>([]);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

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
        setShowMenuPopover={setShowMenuPopover}
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
        showModal={showMenuPopover}
        setShowModal={setShowMenuPopover}
        initials={member.initials}
        name={member.fullName}
        email={member.email}
      />
    </>
  );
};

export default Boards;
