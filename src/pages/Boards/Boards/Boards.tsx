import { useEffect } from 'react';
import BoardList from '../BoardList';
import CreateBoardModal from '../CreateBoardModal/';
import useMemberContext from '../../../hooks/useMemberContext';
import { AllBoards, BoardsTitle, Wrapper } from './style';
import useGetUpdateBoards from '../../../hooks/graphQL/useGetUpdateBoards';
import useToggle from '../../../hooks/useToggle';

const Boards = () => {
  const [showCreateBoardModal, toggleCreateBoardModal] = useToggle();

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
            toggleCreateBoardModal={toggleCreateBoardModal}
          />
          {showCreateBoardModal && (
            <CreateBoardModal toggleCreateBoardModal={toggleCreateBoardModal} />
          )}
        </AllBoards>
      </Wrapper>
    </>
  );
};

export default Boards;
