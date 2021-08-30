import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_BOARDS } from '../../graphql/queries/getAllLists';
import { BoardInterface } from '../../types';
import { CREATE_BOARD } from '../../graphql/mutations/all';
import BoardList from './BoardList';
import styled from 'styled-components';

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
  const { loading, error, data, refetch } = useQuery(ALL_BOARDS);

  const [newBoardMutation] = useMutation(CREATE_BOARD);

  const [boardList, setBoardList] = useState<BoardInterface[]>([]);

  useEffect(() => {
    if (data) {
      setBoardList(data.allBoards);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const addBoard = (name: string) => {
    newBoardMutation({
      variables: { createBoardInput: { name } },
    });
    refetch();
  };

  return (
    <Wrapper>
      <AllBoards>
        <BoardsTitle>YOUR BOARDS</BoardsTitle>
        <BoardList addBoard={addBoard} boardList={boardList} />
      </AllBoards>
    </Wrapper>
  );
};

export default Boards;
