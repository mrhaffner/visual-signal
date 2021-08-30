import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOARDS } from '../../graphql/queries/getAllLists';
import { BoardInterface } from '../../types';
import BoardList from './BoardList';
import styled from 'styled-components';
import CreateBoardModal from './CreateBoardModal';

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
  const { loading, error, data } = useQuery(ALL_BOARDS);

  const [boardList, setBoardList] = useState<BoardInterface[]>([]);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

  useEffect(() => {
    if (data) {
      setBoardList(data.allBoards);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <Wrapper>
      <AllBoards>
        <BoardsTitle>YOUR BOARDS</BoardsTitle>
        <BoardList
          boardList={boardList}
          setShowCreateBoardModal={setShowCreateBoardModal}
        />
        {showCreateBoardModal && (
          <CreateBoardModal setShowCreateBoardModal={setShowCreateBoardModal} />
        )}
      </AllBoards>
    </Wrapper>
  );
};

export default Boards;
