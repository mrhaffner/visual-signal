import { useState, useEffect } from 'react';
import BoardList from '../BoardList';
import CreateBoardModal from '../CreateBoardModal/';
import useMemberContext from '../../../hooks/useMemberContext';
import { AllBoards, BoardsTitle, Wrapper } from './style';
import useGetUpdateBoards from '../../../hooks/graphQL/useGetUpdateBoards';

const Boards = () => {
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

  const { setMemberFound } = useMemberContext();
  const { loading, error, boardList, refetch } = useGetUpdateBoards();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (error) {
      setMemberFound(false);
    }
  }, [error]);

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
